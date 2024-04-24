import express from 'express';

// Instantiate the server
const app = express();

// Serve static files from the 'static_files' directory
app.use(express.static('static_files'));

// Listen for GET requests on the root path
app.get('/', (req, res) => 
{
  res.send('Hello!');
});

// Listen on port 3000
app.listen(3000, () => { 
  console.log('Server started at port 3000');
});
