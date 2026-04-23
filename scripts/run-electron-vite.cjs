const { spawn } = require('child_process');
const { join } = require('path');

const args = process.argv.slice(2);
const command = process.platform === 'win32'
  ? join(process.cwd(), 'node_modules', '.bin', 'electron-vite.cmd')
  : join(process.cwd(), 'node_modules', '.bin', 'electron-vite');

const env = { ...process.env };
delete env.ELECTRON_RUN_AS_NODE;

const child = spawn(command, args, {
  env,
  stdio: 'inherit',
  shell: process.platform === 'win32',
});

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 0);
});
