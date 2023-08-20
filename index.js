// run with
// node index.js

const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
const port = 3000;

// Set up the storage for uploaded files
const storage = multer.diskStorage({
  destination: path.join(__dirname, "uploads"),
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

// Set up the multer middleware for handling file uploads
const upload = multer({ storage });

// Serve the HTML page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Serve the HTML page
app.get("/card", (req, res) => {
  const cardName = req.query;
  console.log(req.query);
  res.send("card");
});

app.get("/script.js", (req, res) => {
  res.sendFile(path.join(__dirname, "script.js"));
});

// Handle the deck file upload
app.post("/upload", upload.single("deckFile"), (req, res) => {
  if (!req.file) {
    res.status(400).send("No file uploaded");
  } else {
    // File uploaded successfully
    res.send("File uploaded");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
