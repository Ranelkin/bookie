type Level = "debug" | "info" | "warn" | "error";

interface LogEntry {
  level: Level;
  module: string;
  message: string;
  data?: unknown;
  timestamp: string;
}

function createLogger(module: string) {
  const log = (level: Level, message: string, data?: unknown) => {
    const entry: LogEntry = {
      level,
      module,
      message,
      timestamp: new Date().toISOString(),
      ...(data !== undefined && { data }),
    };
    const method = level === "debug" ? "log" : level;
    console[method](
      `[${level.toUpperCase()}] [${module}]`,
      message,
      data !== undefined ? data : "",
    );
  };

  return {
    debug: (message: string, data?: unknown) => log("debug", message, data),
    info: (message: string, data?: unknown) => log("info", message, data),
    warn: (message: string, data?: unknown) => log("warn", message, data),
    error: (message: string, data?: unknown) => log("error", message, data),
  };
}

export { createLogger };
export type { LogEntry, Level };
