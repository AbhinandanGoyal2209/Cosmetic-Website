// const express = require('express');
// const cors = require('cors');
// const bcrypt = require('bcrypt');
// const path = require('path');
// const app = express();
// const port = 3001;

// app.use(express.json());
// app.use(cors());
// app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the 'public' folder

// const users = [];

// // Serve the HTML file
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// // API to register a user
// app.post('/register_user', async (req, res) => {
//     const { name, age, email, password, phone } = req.body;

//     // Validate input
//     if (!name || !age || !email || !password || !phone) {
//         return res.status(400).json({ message: "All fields are required." });
//     }

//     // Check for existing user
//     const existingUser = users.find(user => user.email === email);
//     if (existingUser) {
//         return res.status(400).json({ message: "Email is already registered." });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user_id = users.length === 0 ? 1 : users[users.length - 1].id + 1;

//     const new_user = {
//         id: user_id,
//         name,
//         age,
//         email,
//         password: hashedPassword,
//         phone,
//     };

//     users.push(new_user);
//     console.log(users);

//     // res.status(201).json({ message: "User Registered Successfully." });
//     res.status(201).json({ redirect: "/success.html" });
// });

// // Error Handling Middleware
// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).json({ message: "Something went wrong." });
// });

// app.listen(port, () => {
//     console.log(`Server running on http://localhost:${port}...`);
// });



// const express = require('express');
// const cors = require('cors');
// const bcrypt = require('bcrypt');
// const path = require('path');
// const fs = require('fs');

// const app = express();
// const port = 3001;

// app.use(express.json());
// app.use(cors());
// app.use(express.static(path.join(__dirname, 'public')));

// // Path to the file where user data will be stored
// const usersFilePath = path.join(__dirname, 'data', 'users.json');

// // Ensure the data directory exists
// if (!fs.existsSync(path.join(__dirname, 'data'))) {
//     fs.mkdirSync(path.join(__dirname, 'data'));
// }

// // Ensure the users.json file exists and is initialized
// if (!fs.existsSync(usersFilePath)) {
//     fs.writeFileSync(usersFilePath, JSON.stringify([]));
// }

// // Helper function to read users from the file
// const readUsersFromFile = () => {
//     if (!fs.existsSync(usersFilePath)) {
//         return [];
//     }

//     const fileContent = fs.readFileSync(usersFilePath, 'utf-8');
//     return fileContent.trim() ? JSON.parse(fileContent) : [];
// };

// // Helper function to write users to the file
// const writeUsersToFile = (users) => {
//     fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
// };

// // Serve the HTML file
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// // API to register a user
// app.post('/register_user', async (req, res) => {
//     const { name, age, email, password, phone } = req.body;

//     // Validate input
//     if (!name || !age || !email || !password || !phone) {
//         return res.status(400).json({ message: "All fields are required." });
//     }

//     const users = readUsersFromFile();

//     // Check for existing user
//     const existingUser = users.find(user => user.email === email);
//     if (existingUser) {
//         return res.status(400).json({ message: "Email is already registered." });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user_id = users.length === 0 ? 1 : users[users.length - 1].id + 1;

//     const new_user = {
//         id: user_id,
//         name,
//         age,
//         email,
//         password: hashedPassword,
//         phone,
//     };

//     users.push(new_user);

//     // Write the updated users to the file
//     writeUsersToFile(users);

//     res.status(201).json({ redirect: "/success.html" });
// });

// // API to view registered users
// app.get('/customers', (req, res) => {
//     const users = readUsersFromFile();
//     res.send(`
//         <h1>Registered Customers</h1>
//         <ul>
//             ${users.map(user => `<li>${user.name} (${user.email}) - Phone: ${user.phone}</li>`).join('')}
//         </ul>
//         <a href="/">Go back to registration</a>
//     `);
// });

// // Error Handling Middleware
// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).json({ message: "Something went wrong." });
// });

// app.listen(port, () => {
//     console.log(`Server running on http://localhost:${port}...`);
// });










const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const path = require('path');
const fs = require('fs'); // For file handling
const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// Load customers data from file (or use in-memory data for testing)
let users = [];

function readUsersFromFile() {
    try {
        const data = fs.readFileSync('customers.json', 'utf-8');
        users = JSON.parse(data);
    } catch (err) {
        console.error('Error reading users data from file', err);
    }
}

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API to register a user
app.post('/register_user', async (req, res) => {
    const { name, age, email, password, phone } = req.body;

    // Validate input
    if (!name || !age || !email || !password || !phone) {
        return res.status(400).json({ message: "All fields are required." });
    }

    // Check for existing user
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(400).json({ message: "Email is already registered." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user_id = users.length === 0 ? 1 : users[users.length - 1].id + 1;

    const new_user = {
        id: user_id,
        name,
        age,
        email,
        password: hashedPassword,
        phone,
    };

    users.push(new_user);

    // Save updated users to file
    fs.writeFileSync('customers.json', JSON.stringify(users, null, 2));

    res.status(201).json({ redirect: "/success.html" });
});

// API to get customers
app.get('/get_customers', (req, res) => {
    readUsersFromFile();  // Load data from file
    res.json(users); // Send customers data as JSON
});

// Serve success page
app.get('/success.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'success.html'));
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong." });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}...`);
});

