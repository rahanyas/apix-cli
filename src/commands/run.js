import chalk from 'chalk';
import ora from 'ora';
import { getSaved } from '../store.js';
import { makeRequest } from '../http.js';
import { displayResponse, displayError } from '../display.js';
import { addToHistory } from '../store.js';

export async function runCommand(name) {
  const req = getSaved(name);
  if (!req) {
    console.error(chalk.red(`\n✖ No saved request named "${name}"\n`));
    process.exit(1);
  }

  console.log(chalk.dim(`\nRunning "${name}"  ${req.method} ${req.url}`));
  const spinner = ora('Sending...').start();

  try {
    const res = await makeRequest(req);
    spinner.stop();
    displayResponse(res);
    addToHistory({ method: req.method, url: req.url, status: res.status, duration: res.duration });
  } catch (err) {
    spinner.stop();
    displayError(err);
  }
}