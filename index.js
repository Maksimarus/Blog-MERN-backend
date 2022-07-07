import express from 'express';

const PORT = 3333;
const app = express();

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.listen(PORT, error => {
  if (error) {
    return console.log(error);
  }
  console.log('Server is OK!');
});
