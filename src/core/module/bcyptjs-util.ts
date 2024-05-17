import bcrypt from 'bcryptjs'

export const hashing = (data: string) => {
    const salt =  bcrypt.genSaltSync(10)
    const hash =  bcrypt.hashSync(data, salt)
    return hash 
}


export const verifyHashToken = async (data: string, hashed: string) => {
    const verify_hash =  await bcrypt.compare(data, hashed) 
    return verify_hash
}
