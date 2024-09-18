const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

// Serve static files from the current directory or a "public" directory
app.use(express.static(path.join(__dirname)));

// Middleware to parse JSON
app.use(bodyParser.json());

app.post('/generate', (req, res) => {
  const { size, option } = req.body;
  const parsedSize = parseInt(size, 10);

  if (isNaN(parsedSize) || parsedSize < 0) {
    return res.status(400).json({ result: 'Invalid size input. Please enter a positive integer.' });
  }

  if (option === 'a') {
    const space = ' '.repeat(parsedSize);
    const result = `(${space}.${space})(${space}.${space})`;
    res.json({ result });
  } else if (option === 'b') {
    if (parsedSize === 69) {
      res.sendFile('og_mud_bone.webp', { root: __dirname });
    }
    else {
      const top = "()()\n";
      const middle = " ||\n".repeat(parsedSize);
      const bottom = " \\/\n";
      const result = top + middle + bottom;
      res.json({ result });
    }
  } else {
    res.status(400).json({ error: 'Invalid option selected' });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});