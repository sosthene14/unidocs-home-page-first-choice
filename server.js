require('dotenv').config()
const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const listenPort = 5015 || 3000;
const mongoUrl = process.env.MONGO_URL;

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
  });
mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
  })
  .catch((e) => console.log(e));

require("./schema_mongo");
const files = mongoose.model(process.env.DB_NAME);

  app.get("/get/home", async (req, res) => {
    try {
      const data = await files.find({}).limit(8);
      res.send({ data: data });
    } catch (error) {
      res.send({ status: "erreur" });
    }
  });

app.listen(listenPort, () => {
  console.log("server started port "+listenPort);
});

