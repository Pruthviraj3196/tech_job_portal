require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); 
const userRouter = require("./routes/user");
const jobRouter = require("./routes/jobs");
const authMiddleWare = require("./middleware/authenication");
 
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Database is Connected successfully"))
.catch((err) => console.log(err));
const PORT = 4000;

app.use("/api/v1/",userRouter);
app.use("/api/v1",authMiddleWare, jobRouter);

app.listen(PORT,()=>{
    console.log(`Server is Runnig on ${PORT}`);
    
}); 