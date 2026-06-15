import chalk from "chalk";
import { parseHeaders } from "../http.js";
import { saveToCollection } from "../store.js";

export function saveCommand(name, method, url, options){
    const headers = parseHeaders(options.header);
    saveToCollection(name, {
        method : method.toUpperCase(),
        url, 
        headers,
        data : options.data || null
    });
    console.log('\n' + chalk.green(`✔ Saved "${name}"`) + `  ${method.toUpperCase()} ${url}\n`);
}