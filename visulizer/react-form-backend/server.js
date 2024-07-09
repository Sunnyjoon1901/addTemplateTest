const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(cors("*"));
app.use(bodyParser.json());

// Endpoint to save data
app.post('/saveData', (req, res) => {
  const newData = req.body;

  // File path for data.json
  const dataFilePath = path.join(__dirname, 'data', 'data.json');

  // Read existing data from file
  fs.readFile(dataFilePath, 'utf8', (readErr, data) => {
    if (readErr && readErr.code === 'ENOENT') {
      // If the file does not exist, start with an empty array
      existingData = [];
    } else if (readErr) {
      console.error('Error reading file:', readErr);
      return res.status(500).send('Error reading data file');
    } else {
      try {
        existingData = JSON.parse(data);
        if (!Array.isArray(existingData)) {
          throw new Error('Data is not an array');
        }
      } catch (parseErr) {
        console.error('Error parsing JSON:', parseErr);
        return res.status(500).send('Error parsing JSON data');
      }
    }

    // Append new data to existing array
    existingData.push(newData);

    // Write updated data back to file
    fs.writeFile(dataFilePath, JSON.stringify(existingData, null, 2), 'utf8', (writeErr) => {
      if (writeErr) {
        console.error('Error writing file:', writeErr);
        return res.status(500).send('Error saving data');
      }
      console.log('Data saved successfully');
      res.send('Data saved successfully');
    });
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
