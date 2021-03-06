const fs = require('fs').promises;
const typescript = require('typescript');
const stripComments = require('strip-comments');

const hasDecorator = (fileContent, offset = 0) => {
  let cleanedFileContents = fileContent;

  if (offset === 0) {
    // check if file contains an @ at all
    if (fileContent.indexOf('@', offset) === -1) {
      return false;
    }

    // strip comments which could contain @
    cleanedFileContents = stripComments(fileContent);
  }

  const atPosition = cleanedFileContents.indexOf('@', offset);

  if (atPosition === -1) {
    return false;
  }

  if (atPosition === 0) {
    return true;
  }

  // ignore "@ and '@ as they are used in require('@org/repo')
  if (["'", '"'].includes(cleanedFileContents.substr(atPosition - 1, 1))) {
    return hasDecorator(cleanedFileContents, atPosition + 1);
  }

  return true;
};

module.exports = (
  options = { tsconfigPath: './tsconfig.json', force: false, tsx: true }
) => ({
  name: 'tsc',
  setup(build) {
    let tsconfigRaw = null;

    build.onLoad(
      { filter: options.tsx ? /\.tsx?$/ : /\.ts$/ },
      async (args) => {
        if (!tsconfigRaw) {
          tsconfigRaw = JSON.parse(
            stripComments(await fs.readFile(tsconfigPath, 'utf8')) || null
          );
          if (tsconfigRaw.sourcemap) {
            tsconfigRaw.sourcemap = false;
            tsconfigRaw.inlineSources = true;
            tsconfigRaw.inlineSourceMap = true;
          }
        }

        const ts = await fs.readFile(args.path, 'utf8');
        if (
          options.force ||
          (tsconfigRaw.compilerOptions &&
            tsconfigRaw.compilerOptions.emitDecoratorMetadata &&
            hasDecorator(ts))
        ) {
          const program = typescript.transpileModule(ts, tsconfigRaw);
          return { contents: program.outputText };
        }
      }
    );
  },
});
