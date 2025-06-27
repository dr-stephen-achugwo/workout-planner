const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const userRoute = require("./routes/users.js");
const authRoute = require("./routes/auth.js");
const entryRoute = require("./routes/entries.js");
const routineRoute = require("./routes/routines.js");
const mealRoute = require("./routes/meals.js");
const cookieParser = require("cookie-parser");
require("dotenv").config();


const app = express();
app.use(express.json());

// Enable CORS for all routes
app.use(cors({
    origin: [
        'https://crud-mern-0zhi.onrender.com/', 
        'https://mern4.apps.net.ng/', 
        'https://crud-mern-client-khaki.vercel.app/', 
        'https://crud-mern-client-dr-stephens-projects.vercel.app/', 
        'https://crud-mern-client-git-main-dr-stephens-projects.vercel.app/'
    ], 
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true // Allow credentials (like cookies) to be sent
}));

async function dbCon() {
  await mongoose.connect(process.env.MONGO);
  app.use('/', (req, res) => {
    res.send('Server for Login & Registration is running!');
  });
}
dbCon()
.then(() => console.log("Mongodb connected successfully!"))
.catch(err => console.log(err));

app.get('/', (req, res) => { res.send('Hello from Express!') });

app.use(cookieParser())
app.use(express.json());
app.use(helmet());


app.use(morgan("common"));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/entries", entryRoute);
app.use("/api/routines", routineRoute);
app.use("/api/meals", mealRoute);


app.listen(7700, () => {
  console.log("server is running");
});

// app.listen(PORT, () => {
//     console.log("Listening on port 2000");
//     connect();
// });