import Agent from "@dannie-prod/dannie-prod-agent"
import fs from "fs"

import {createPDF} from "./pdf.js";
import {print} from "./print.js";

const confPath = process.env.PRINTER_AGENT_CONF_PATH ?  process.env.PRINTER_AGENT_CONF_PATH : 'conf.json'
const conf =  JSON.parse(fs.readFileSync(confPath, 'utf8'))
const agent  = new Agent({
    host: conf.host,
    mount: conf.mount,
    token: conf.token
})

agent.run(async (data) => {
    let label = null
    try {
        label = data.map((row)=> {
            if(Array.isArray(row)){
                return row.join("")
            }else {
                return row
            }
        }).concat([""]).join("\n")
    }catch(e){
        throw {error: "format", message: "input data parsing error"}
    }
    try {
        if(label){
            createPDF(data)
            console.log("Идет печать...")
            // print()
        }
    }catch(e){
        throw {error: "print", message: "Printer is unavailable"}
    }
    return true
})
