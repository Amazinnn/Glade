export interface CliError {
  code: string;
  message: string;
}

export function printOk<T>(data: T): void {
  console.log(JSON.stringify({ ok: true, data }));
}

export function printError(error: unknown, code = 'COMMAND_FAILED'): void {
  const message = error instanceof Error ? error.message : String(error);
  console.log(JSON.stringify({ ok: false, error: { code, message } }));
}
