const dotEnv = require("dotenv");

if (process.env.NODE_ENV !== "prod") {
  dotEnv.config();
  //const configFile = `.env.${process.env.NODE_ENV}`;
  // console.log(configFile);
  // dotEnv.config({ path: configFile });
} else {
}

module.exports = {
  PORT: process.env.PORT,
  DB_URL: process.env.MONGODB_URI,
  APP_SECRET: process.env.APP_SECRET,
};
