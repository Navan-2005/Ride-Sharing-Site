const express= require('express')
const dotenv=require('dotenv')
const userroutes=require('./routes/user.routes')
const captainroutes=require('./routes/captain.routes')
const maproutes=require('./routes/maps.routes')
const rideRoutes = require('./routes/ride.router'); 

const cookieParser=require('cookie-parser')
dotenv.config();
const cors=require('cors')
const connectToDb = require('./db/db')
connectToDb();
const app=express()
app.use(cors());
app.use(cookieParser())


app.use(express.json());
app.use('/users',userroutes);
app.use('/captains',captainroutes);
app.use('/maps',maproutes);
app.use('/rides', rideRoutes);


module.exports=app;