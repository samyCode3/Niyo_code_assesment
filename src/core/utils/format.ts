

const formatDuplicateError = (message: any , split_num: number) => {
    let split_mess = message 
    let values = split_mess.split(" ")
    return values[split_num]
}

// console.log(formatDuplicateError("Duplicate entry 'first1008@gmail.com' for key email", 4))

export default {
    formatDuplicateError
}