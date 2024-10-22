import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import studentRouter from './routes/student';

const app = express();
const port: number = 3000;

// Middleware
app.use(express.json());
app.use(cors()); // Apply CORS middleware to all routes

// API routes
app.use("/api/students", studentRouter);

// Optional root route example

mongoose.connect("mongodb://localhost:27018/student").then(() => {
    console.log("Connected to MongoDB");
  }).catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}:`);
  console.log(`http://localhost:${port}/`);
});
