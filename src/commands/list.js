import chalk from "chalk";
import { getCollection } from "../store.js";

export function listCommand(){
    const collection = getCollection();
    const entries = Object.entries(collection);

    if(entries.length === 0){
        console.log(chalk.dim('\n No saved requests yet. Use `apix save` or `apix req --save-as`.\n'));
        return;
    };

    console.log('');
    for(const [name, req] of entries){
        const method = req.method.padEnd(7);
        console.log(`  ${chalk.cyan(name.padEnd(20))} ${chalk.yellow(method)} ${req.url}`);
    };
    console.log('')
}