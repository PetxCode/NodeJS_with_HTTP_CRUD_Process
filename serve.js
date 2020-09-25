const express = require("express");
const dotenv = require("dotenv");

//const config = require({ path: "./config/config.env" });

dotenv.config({ path: "./config/config.env" });
const serve = express();
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`server running on ${process.env.NODE_ENV} on mode ${PORT}`);
});
