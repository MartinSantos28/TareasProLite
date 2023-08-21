const express = require('express');
const mysql = require('mysql');
const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());


// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'andrearoman',
  database: 'estructura',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

// Define the route for form submission (registration)
app.post('/register', (req, res) => {
  // Extract the form data from the request body
  const {email, username, password } = req.body;

  // Perform validation
  if (!email|| !username || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Create the SQL query to insert a new user
   const query = `INSERT INTO users (email, username, password) VALUES (?, ?, ?)`;
   const values = [email, username, password];

  // Execute the query
  connection.query(query, values, (err, results) => {
    if (err) {
      console.error('Error saving user to database:', err);
      return res.status(500).json({ error: 'Error saving user to database' });
    }
    res.status(200).json({ message: 'User registered successfully' });
  });
});

// Define the route for login
app.post('/login', (req, res) => {
  // Extract the form data from the request body
  const { email, password } = req.body;

  // Perform authentication logic
  const query = 'SELECT * FROM users WHERE email = ?';
  connection.query(query, [email], (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      return res.status(500).json({ error: 'Error querying the database' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = results[0];

    // Compare the provided password with the stored password
    if (password !== user.password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Authentication successful
    res.status(200).json({ message: 'Login successful' });
  });
});



// Define the route to add a task
app.post('/tareas/agregar', (req, res) => {
  const { nombre } = req.query;

  if (!nombre) {
    return res.status(400).json({ error: 'El nombre de la tarea es obligatorio' });
  }

  const query = 'INSERT INTO tareas (nombre) VALUES (?)';
  connection.query(query, [nombre], (err, results) => {
    if (err) {
      console.error('Error al agregar la tarea a la base de datos:', err);
      return res.status(500).json({ error: 'Error al agregar la tarea a la base de datos' });
    }
    res.status(200).json({ message: 'Tarea agregada exitosamente' });
  });
});

// Define the route to get tasks
app.get('/tareas', (req, res) => {
  const query = 'SELECT * FROM tareas';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener las tareas de la base de datos:', err);
      return res.status(500).json({ error: 'Error al obtener las tareas de la base de datos' });
    }
    res.status(200).json(results);
  });
});


app.put('/tareas/editar/:id', (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;

  if (!nombre) {
    return res.status(400).json({ error: 'El nuevo nombre de la tarea es obligatorio' });
  }

  const query = 'UPDATE tareas SET nombre = ? WHERE id = ?';
  connection.query(query, [nombre, id], (err, results) => {
    if (err) {
      console.error('Error al editar la tarea en la base de datos:', err);
      return res.status(500).json({ error: 'Error al editar la tarea en la base de datos' });
    }
    res.status(200).json({ message: 'Tarea editada exitosamente' });
  });
});

app.put('/tareas/finalizar/:id', (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  if (completed === undefined) {
    return res.status(400).json({ error: 'El estado completado es obligatorio' });
  }

  const query = 'UPDATE tareas SET completed = ? WHERE id = ?';
  connection.query(query, [completed, id], (err, results) => {
    if (err) {
      console.error('Error al marcar la tarea como completada en la base de datos:', err);
      return res.status(500).json({ error: 'Error al marcar la tarea como completada en la base de datos' });
    }
    res.status(200).json({ message: 'Tarea marcada como completada exitosamente' });
  });
});














// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
