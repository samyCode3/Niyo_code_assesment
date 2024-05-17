import { createLogger, format, transports } from "winston";
const {printf, combine, timestamp, colorize, json} = format


const myFormat = printf(({level, message, timestamp}) => {
       return `${timestamp} [${level}] ${message}`
}) 


export const DevelopmentLogger = 

createLogger({
        level: 'debug',
        format: combine(json(), colorize(), timestamp({format: "HH:mm:ss.SSS"}), myFormat),
        transports: [
            new transports.Console()

        ]
     }) 

 
export const ProductionLogger = 
createLogger({
    level: 'debug',
    format: combine(timestamp({format: "HH:mm:ss.SSS"}), myFormat),
    transports: [
        new transports.File({filename: '../../logs/error.log', level: 'error'}),
        new transports.File({filename: '../../logs/info.log', level: 'info'}),
        new transports.Console()

    ]
 })