import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from './config/config.js'
dotenv.config();
//connect to database
connectDB()
const app=express();
app.use(express.json()); 
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}))
const PORT =process.env.PORT || 5000; 
import EmployeeRoutes from './routes/employee.routes.js';
app.use('/api',EmployeeRoutes)
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});


export default app;