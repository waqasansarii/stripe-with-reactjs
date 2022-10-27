const express = require('express')
const app = express()
require('dotenv').config()
const bodyParser = require('body-parser')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const cors = require('cors')

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use(cors())


app.post('/payment', cors() ,  (async (req, res)=>{
      let {amount , id} = req.body

      try{
        const payment = await stripe.paymentIntents.create({
            amount,
            currency:"USD",
            description:'testing',
            payment_method:id,
            confirm:true
        })

        console.log('payment ',payment)
        res.json({
            message : 'payment successful',
            success:true
        })
      }catch(err){
        console.log('error',err)
        res.json({
            message : 'payment failed',
            success:false
        })
      }
}))


app.listen(4000 , ()=>{
    console.log('server is running on 4000')
})