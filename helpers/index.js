const colors = require("colors");
const moment = require("moment");

async function delay(seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

async function printMsg(msg) {
    console.log(
        colors.yellow(moment().format("YYYY-MM-DD hh:mm:ss")),
        colors.green(msg)
    );
}

async function printError(msg) {
    console.error(
        colors.yellow(moment().format("YYYY-MM-DD hh:mm:ss")),
        colors.red(msg)
    );
}

module.exports = {
    delay,
    printMsg,
    printError,
};