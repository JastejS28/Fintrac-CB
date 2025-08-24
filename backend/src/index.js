import path from 'path'
import express from 'express'
const PORT= process.env.PORT;
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
const app= express();   // Create an Express application
import userRoutes from './routes/user.routes.js'
import transactionRoutes from './routes/transaction.routes.js'
import budgetRoutes from './routes/budget.routes.js'
import goalRoutes from './routes/goal.routes.js'
import reportRoutes from './routes/report.routes.js'
import aiRoutes from './routes/ai.routes.js'

app.use(cors({
    origin:process.env.CORS_ORIGINS,
    credential:true
}))

app.use(bodyParser.json())
app.use(express.urlencoded({extended:true}))   //"Let Express understand data sent from an HTML form, so you can use req.body to get the values easily."
app.use(express.static('public'))

app.use(cookieParser())

app.use('/api/v1/user',userRoutes)
app.use('/api/v1/transaction', transactionRoutes)
app.use('/api/v1/budgets', budgetRoutes)
app.use('/api/v1/goal', goalRoutes)
app.use('/api/v1/report', reportRoutes)
app.use('/api/v1/ai', aiRoutes)

mongoose.connect(`${process.env.DB_PATH}/${process.env.DB_NAME}`)
.then(()=>{
app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`);
    console.log('server is running on port no.'+PORT)
})
})
.catch(err=>{
    console.log(err)
})