#!/usr/bin/env node
import { program } from 'commander';
import { requestCommand } from '../src/commands/request.js';
import { saveCommand } from '../src/commands/save.js';
import { runCommand } from '../src/commands/run.js';
import { listCommand } from '../src/commands/list.js';
import { historyCommand } from '../src/commands/history.js';

program
  .name('apix')
  .description('Terminal HTTP client — make, save, and replay API requests')
  .version('1.0.0');

program
  .command('request <method> <url>')
  .alias('req')
  .description('Make an HTTP request')
  .option('-H, --header <header...>', 'Add headers (e.g. "Authorization: Bearer token")')
  .option('-d, --data <json>', 'JSON request body')
  .option('-s, --save-as <name>', 'Save this request after running it')
  .action(requestCommand);

program
  .command('save <name> <method> <url>')
  .description('Save a request to your collection')
  .option('-H, --header <header...>', 'Headers to include')
  .option('-d, --data <json>', 'JSON body to include')
  .action(saveCommand);

program
  .command('run <name>')
  .description('Replay a saved request')
  .action(runCommand);

program
  .command('list')
  .alias('ls')
  .description('List all saved requests')
  .action(listCommand);

program
  .command('history')
  .alias('hist')
  .description('Show recent request history')
  .option('-n, --count <number>', 'How many entries to show', '10')
  .action(historyCommand);

program.parse();