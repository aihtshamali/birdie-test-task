import * as express from "express";
const error = require("./middleware/error");

const family: express.Router = require("./routes/family")
const bodyParser = require("body-parser");

const app = express();
app.use(error)
app.use(bodyParser.json());
require('./logging')();
// require('./validation')();
app.use('/family', family);
 
// Uncaught Exceptions handle by this middleware
export default app;
