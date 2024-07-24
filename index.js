const mongoose = require('mongoose');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

// Connect to MongoDB
app.post('/', async (req, res) => {
  try {
    const uri = req.body.myuri; // MongoDB URI from the form
    // Connect to MongoDB using the provided URI
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');

    // Define Schema
    const studentSchema = new mongoose.Schema({
      myName: String,
      mySID: String
    });

    // Define Model
    const Student = mongoose.model('Student', studentSchema);

    // Create a new document
    const student = new Student({
      myName: 'Your Full Name', // Replace with your actual full name
      mySID: 'Your Student ID'   // Replace with your actual student ID
    });

    // Save the document to MongoDB
    await student.save();
    console.log('Document Added');

    // Close the connection
    await mongoose.connection.close();

    // Send response to the user
    res.send(`<h1>Document Added</h1>`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error connecting to MongoDB or adding document');
  }
});

// Serve the HTML form
app.get('/', (req, res) => {
  res.sendFile(__dirname + "/form.html");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
