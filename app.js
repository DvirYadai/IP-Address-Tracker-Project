require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();

app.use(cors());
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/:ip", (req, res) => {
  const ip = req.params.ip;
  axios
    .get(
      `
    https://geo.ipify.org/api/v1?apiKey=${process.env.API_KEY}&ipAddress=${ip}
    `
    )
    .then((response) => {
      return res.status(200).json(response.data);
    })
    .catch((err) => {
      return res.status(422).json(err.response.data);
    });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
