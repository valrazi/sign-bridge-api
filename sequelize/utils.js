const bcrypt = require('bcrypt')


module.exports ={
    hashPassword(password){
        return bcrypt.hashSync(password, 10)
    },
    comparePassword(plain, hashed){
        return bcrypt.compareSync(plain, hashed)
    }
}