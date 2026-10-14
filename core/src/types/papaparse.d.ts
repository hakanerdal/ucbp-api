declare module "papaparse" {
  export interface ParseResult<T> {
    data: T[];
  }

  export interface ParseConfig {
    header?: boolean;
    dynamicTyping?: boolean;
  }

  const Papa: {
    parse<T = Record<string, unknown>>(
      input: string,
      config?: ParseConfig
    ): ParseResult<T>;
  };

  export default Papa;
}
