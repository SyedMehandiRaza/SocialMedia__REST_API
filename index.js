const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");


const PORT = 8800;

const app = express();

dotenv.config();

mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });



// Middleware

app.use(express.json());
app.use(helmet());
app.use(morgan('combined'));

app.use("/api/users",userRoute)









app.listen(PORT,() => {
  console.log("Server is running at Port 8800");
})