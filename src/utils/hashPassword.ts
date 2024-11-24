import bcrypt from 'bcrypt'

export function hashPassword(password: string){
    return bcrypt.hashSync(password, 10)
} 

export function comparePassword(plain: string, hashed: string){
    return bcrypt.compareSync(plain, hashed)
}