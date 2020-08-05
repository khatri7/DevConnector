const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

const app = express();

//Connect database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Define routes
app.use("/api/users", require("./routes/api/user"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profiles", require("./routes/api/profile"));
app.use("/api/post", require("./routes/api/post"));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
