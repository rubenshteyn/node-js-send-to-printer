import {exec} from "child_process"
import fs from "fs"

// запуск происходит через 2 секунды, так как файла еще нет в директории
export function print() {
    setTimeout(() => {
        exec("lpr document.pdf", (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
        });
    }, 2000)
}