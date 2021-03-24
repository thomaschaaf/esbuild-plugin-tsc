declare function esbuildPluginTsc(options?: {
  // If empty, uses tsconfig.json
  tsconfigPath?: string;
  // If true, force compilation with tsc
  force?: boolean;
  // If true, enables tsx file support
  tsx?: boolean;
}): {
  name: string;
  setup(build: any): void;
};

export = esbuildPluginTsc;
