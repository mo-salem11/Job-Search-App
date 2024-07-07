import express from 'express'
import { dbConnection } from './db/dbConnection.js'
import authRouter from './src/modules/auth/auth.routes.js'
import cors from 'cors'
import { globalError } from './src/middleware/globalError.js'
import userRouter from './src/modules/users/users.routes.js'
import companyRouter from './src/modules/company/company.routes.js'
import jobRouter from './src/modules/jobs/jobs.routes.js'
import applicationRouter from './src/modules/application/application.routes.js'

const app = express()
const port = 3000

dbConnection()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true,limit:'50mb'}))

app.use('/auth',authRouter);
app.use('/account',userRouter);
app.use('/company',companyRouter);
app.use('/job',jobRouter);
app.use('/apply',applicationRouter);
app.use(globalError)

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))