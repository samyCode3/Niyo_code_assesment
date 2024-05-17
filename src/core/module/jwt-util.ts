import jwt from 'jsonwebtoken'


export const AccessToken =  (id: string) => {
    const access = jwt.sign({id}, process.env.SECRET_TOKEN , {
       expiresIn: '1d' })
 
    return access
}

export const VerifyToken =  (token: string | any, secret: string) => {
         return jwt.verify(token, secret)
}

