const { esbuildPluginTsc } = require('../src/index');

describe(`plugin tests`, () => {
  const mockBuilder = () => {
    let _filter;
    let _fn;
    const onLoad = (filter, fn) => {
      _filter = filter;
      _fn = fn;
    };
    const simulate = async (args) => _fn(args);
    return { onLoad, simulate };
  };

  let mockService;

  beforeAll(() => {
    mockService = mockBuilder();
    const plugin = esbuildPluginTsc({
      tsconfigPath: `${__dirname}/project/app/tsconfig.app.json`,
    });
    plugin.setup(mockService);
  });

  test(`Can return undefined if no decorators are found`, async () => {
    const result = await mockService.simulate({
      path: `${__dirname}/project/app/src/no-decorators.ts`,
    });

    expect(result).not.toBeDefined();
  });

  test(`Can return transpiled code if decorators are found`, async () => {
    const result = await mockService.simulate({
      path: `${__dirname}/project/app/src/mixed-example.ts`, //mixed-example
    });
    expect(result).toBeDefined();
  });

  test(`Can transpile successfully on various test cases`, async () => {
    const result1 = await mockService.simulate({
      path: `${__dirname}/project/app/src/copy-1.ts`,
    });
    const result2 = await mockService.simulate({
      path: `${__dirname}/project/app/src/copy-2.ts`,
    });
    const result3 = await mockService.simulate({
      path: `${__dirname}/project/app/src/copy-3.ts`,
    });
    const result4 = await mockService.simulate({
      path: `${__dirname}/project/app/src/copy-4.ts`,
    });
    const result5 = await mockService.simulate({
      path: `${__dirname}/project/app/src/copy-5.ts`,
    });
    const result6 = await mockService.simulate({
      path: `${__dirname}/project/app/src/copy-6.ts`,
    });
    const result7 = await mockService.simulate({
      path: `${__dirname}/project/app/src/copy-7.ts`,
    });
    const result8 = await mockService.simulate({
      path: `${__dirname}/project/app/src/copy-8.ts`,
    });

    expect(result1).toBeDefined();
    expect(result2).toBeDefined();
    expect(result3).toBeDefined();
    expect(result4).toBeDefined();
    expect(result5).toBeDefined();
    expect(result6).toBeDefined();
    expect(result7).toBeDefined();
    expect(result8).toBeDefined();
  });
});
