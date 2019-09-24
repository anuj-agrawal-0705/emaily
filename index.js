const express = require('express');
const mongoose = require('mongoose')
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys')
require('./models/user')
require('./services/passport')



mongoose.connect(keys.mongoURI, 
    ()=> console.log('connected to db')
    )


const app = express()

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60* 60 * 1000,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize())
app.use(passport.session())

require('./routes/authRoutes')(app);

const port = process.env.PORT || 5000

app.listen(port,()=>{
    console.log(`app is running on  port ${port}....`)
})