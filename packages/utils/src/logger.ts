interface LogOptions {
  component?: string;
  method?: string;
  params?: Record<string, any> | string | number | boolean;
}

type Log = (options: LogOptions) => void;
type ConfigureLogger = (packageName: string) => Log;

let isLoggingEnabled = false;

const enableLogging = () => {
  if (!__DEV__) {
    console.warn(
      '[react-native-monorepo] could not enable logging on production!'
    );
    return;
  }
  isLoggingEnabled = true;
};

let configureLogger: ConfigureLogger = () => () => {};

if (__DEV__) {
  configureLogger = (packageName: string) => {
    return Object.freeze(({ component, method, params }) => {
      if (!isLoggingEnabled) {
        return;
      }
      let message = '';

      if (typeof params === 'object') {
        message = Object.keys(params)
          .map(key => `${key}:${params[key]}`)
          .join(' ');
      } else {
        message = `${params ?? ''}`;
      }
      // eslint-disable-next-line no-console
      console.log(
        `[${packageName}] [${[component, method].filter(Boolean).join('::')}]`,
        message
      );
    });
  };
}

export { configureLogger, enableLogging };
