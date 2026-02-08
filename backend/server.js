require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')
const morgan = require('morgan')

const app = express();

// Load environment variables
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/mydb";

app.use(cors({
  origin: [`${FRONTEND_URL}`]
}))

app.use(express.json());
app.use(morgan('dev'))


// Test model
const UserSchema = new mongoose.Schema({
  name: String,
});
const User = mongoose.model("User", UserSchema);

// API Routes
app.get("/", (req, res) => {
  res.json({ message: "Hello from Node Backend!"});
});

app.get("/api", (req, res) => {
  res.json({ message: "API working successfully!" });
});

// Route to test DB
app.get("/db-test", async (req, res) => {
  try {
    const newUser = await User.create({ name: "Wasim Test User" });
    res.json({
      message: "MongoDB is working!",
      savedUser: newUser,
    });
  } catch (err) {
    res.status(500).json({
      error: "DB Write Failed",
      details: err.message,
    });
  }
});

const connectDB = () => {
	return mongoose.connect(MONGO_URI)
}
const start = async () => {
   try{
       await connectDB();
       console.log("✅ MongoDB connected successfully")
       app.listen(PORT, () => {
       console.log(`🚀 Backend running on port ${PORT}`);
       });
   } catch (error){
     console.error("MongoDB connection error:", error)
   }
}

start()

