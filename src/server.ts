import app from "./app";
import { sequelize } from "./config/db";
const PORT = process.env.PORT || 4000

app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`)
    try {
        await sequelize.authenticate()
        console.log('Database connection succesfully established')
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})