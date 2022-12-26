require('dotenv').config();

const express  = require('express');
const cors  = require('cors');

const app  = express();



app.use(express.json())
app.use(express.static('public'));
app.use(cors())



const authRouter = require("./src/routers/auth.router.js");
const adminRouter = require('./src/routers/admin.router.js');
const uiRouter = require('./src/routers/ui.router');
const { prisma } = require('./prisma/prisma.js');



app.use('/auth', authRouter);
app.use('/admin' ,adminRouter )
app.use('/ui', uiRouter)

const bcrypt = require("bcrypt");

app.listen(4500, () => {
    console.log("API is running on port 4500");
})

const createAdmin = async () => {

    const isAdminFound = await prisma.users.findFirst({where:{email:process.env.EMAIL_ADMIN}})
    if (isAdminFound) {
        return 
    }
    await prisma.users.create({
        data:{
            lastName:"admin",
            firstName:"admin",
            email :process.env.EMAIL_ADMIN,
            password: await bcrypt.hash(process.env.PASSWORD_ADMIN, 10),
            roles:"admin"
        }
    })
}

createAdmin()