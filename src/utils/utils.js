import  jwt from 'jsonwebtoken';


export const verifyJWT =(token) =>{
    try {
    return jwt.verify(token, 'mysecret')
    } catch (error) {
        console.log(error, "=====================")
        return false
    }
}