import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import Connection from "./database/db.js";
import router from "./routes/route.js";
import path from "path";

 const __dirname = path.resolve();

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", router);

app.use(express.static(path.join(__dirname, "./client/build")));
app.get('*', function(_, res){
  res.sendFile(path.join(__dirname, "./client/build/index.html"), function(err){
    res.status(500).send(err);
  })
})

 const PORT =  process.env.PORT || 8000;

app.listen(PORT, () =>
  console.log(`server is running succesfully on port ${PORT}`)
);
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;
Connection(USERNAME, PASSWORD);
