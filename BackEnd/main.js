const express = require("express");
const app = express();
const PORT = process.env.PORT || 7008;
const studentRouter = require("./Routes/studentsRoutes");
const bodyParser = require("body-parser");
const cors = require('cors');

// middlewares
app.use(cors()); // Enable CORS for all origins

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routers
app.use("/api/student", studentRouter);

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});
