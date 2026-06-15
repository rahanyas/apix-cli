import chalk from "chalk";
import { getHistory } from "../store.js";

function statusColor(status){
    if(status >= 500) return chalk.red;
    if(status >= 400) return chalk.yellow;
    if(status >= 300) return chalk.cyan;
    return chalk.green;
};

export function historyCommand(options){
    const count = parseInt(options.cont, 10);
    const history = getHistory().slice(0, count);

    if(history.length === 0){
        console.log(chalk.dim(`\n No history yet, Make a request first`));
        return;
    };

    console.log('');
    for(const entry of history){
        const color = statusColor(entry.status);
        const time = new Date(entry.timestamp).toLocaleTimeString();
        const method = entry.method.padEnd(7);
        console.log(`${chalk.dim(time)} ${chalk.yellow(method)} ${color(String(entry.status))} ${chalk.dim(entry.duration + 'ms')} ${entry.url}`);
    };
    console.log('')
}