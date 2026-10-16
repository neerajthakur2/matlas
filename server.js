import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {connectDB} from './config/config.js'
dotenv.config();
//connect to database
connectDB()
const app=express();
app.use(express.json()); 
// Add this middleware before defining your routes
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

app.options('*', cors());
const PORT =process.env.PORT || 5000; 
import EmployeeRoutes from './routes/employee.routes.js';
app.use('/api',EmployeeRoutes)
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});


export default app;