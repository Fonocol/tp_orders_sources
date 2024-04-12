import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import cors from "cors";
import { router as routerItems } from "./routes/items.routes";
import { router as routerCommandes } from "./routes/commande.routes";

const hostname = "127.0.0.1";
const port = 5000;

mongoose.connect(
  `mongodb+srv://${process.env.MONGOBD_URL}`
  //
  //`mongodb+srv://<username>:<password>@<domain>.mongodb.net/<db_name>?retryWrites=true&w=majority`
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello !");
});

app.use('/pizzas',routerItems)
app.use('/commandes',routerCommandes);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
