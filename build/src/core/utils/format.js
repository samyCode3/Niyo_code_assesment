"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const formatDuplicateError = (message, split_num) => {
    let split_mess = message;
    let values = split_mess.split(" ");
    return values[split_num];
};
// console.log(formatDuplicateError("Duplicate entry 'first1008@gmail.com' for key email", 4))
exports.default = {
    formatDuplicateError
};
