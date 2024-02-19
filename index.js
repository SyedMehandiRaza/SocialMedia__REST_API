const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
const dotenv = require("dotenv");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");


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
app.use("/api/auth",authRoute)
app.use("/api/post",postRoute)



app.listen(PORT,() => {
  console.log("Server is running at Port 8800");
})