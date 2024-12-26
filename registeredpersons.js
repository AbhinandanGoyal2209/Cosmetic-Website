const express = require('express');
const fs = require('fs');
const app = express();

// Endpoint to get the users
app.get('/users', (req, res) => {
  fs.readFile('registeredpersons.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading file');
    }
    // If the file is empty, send an empty array
    const users = data ? JSON.parse(data) : [];
    res.json(users);
  });
});

// Endpoint to delete users (clears the registeredpersons.json file)
app.get('/delete-users', (req, res) => {
  // Writing an empty array to the file to delete all user data
  fs.writeFileSync('registeredpersons.json', JSON.stringify([], null, 2));
  res.send('All user data has been deleted.');
});

// Endpoint to add a sample user to the file (for testing purposes)
app.get('/add-sample-user', (req, res) => {
  const sampleUser = {
    id: 1,
    name: 'John Doe',
    age: '30',
    email: 'john.doe@example.com',
    password: '$2b$10$samplepasswordhash',
    phone: '1234567890'
  };

  fs.readFile('registeredpersons.json', 'utf8', (err, data) => {
    let users = [];
    if (!err && data) {
      users = JSON.parse(data); // If data exists, parse it
    }
    users.push(sampleUser); // Add the new user
    fs.writeFileSync('registeredpersons.json', JSON.stringify(users, null, 2)); // Write back to the file
    res.send('Sample user added successfully.');
  });
});

// Start the server
app.listen(3001, () => {
  console.log('Server running on http://localhost:3001...');
});
