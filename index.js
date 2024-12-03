const express=require('express')
const app=express()
const dotenv=require('dotenv')
dotenv.config()
const {incomingrequest}=require('./middleware/index')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const cors=require("cors")

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

const indexrouter=require('./routes/index')
const userrouter=require('./routes/user')
const foodrouter=require('./routes/food')
const addressrouter=require('./routes/Address')
const profileRouter=require('./routes/profile')
const paymentRouter=require('./routes/payment')
const ratingrouter=require('./routes/rating')

app.use(incomingrequest)
app.use("/api/food",indexrouter)
app.use('/api/food/user',userrouter)
app.use('/api/food/foodItem',foodrouter)
app.use('/api/food/address',addressrouter)
app.use('/api/food/profile',profileRouter)
app.use('/api/food/payment',paymentRouter)
app.use('/api/food/rate',ratingrouter)



app.listen(process.env.PORT,()=>{
    console.log("server started on port 3000")

    mongoose.connect(process.env.MONGOOSE_URI_STRING,{
      
    })
    mongoose.connection.on('error',err=>{
        console.log(err)
    })
})