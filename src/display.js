import chalk from "chalk";

function statusColor(status){
    if(status >= 500) return chalk.red;
    if(status >= 400) return chalk.yellow;
    if(status >= 300) return chalk.cyan;
    return chalk.green;
};

export function displayResponse(res){
    const color = statusColor(res.status);

    console.log(`\n ${color(res.status, res.statusText)} ${chalk.dim(res.duration)} ms`);

    console.log(chalk.dim('--'.repeat(48)));

    const contentType = res.header['content-type'] || '';

    if(contentType.includes('application/json')){
        console.log(JSON.stringify(res.data, null, 2));
    }else{
        console.log(String(res.data).slice(0, 2000))
    }
    console.log('')
};

export function displayError(err){
    console.error(`\n ${chalk.red('X Request failed')}`);
    console.error(chalk.dim(err.message));
    console.log('')
}