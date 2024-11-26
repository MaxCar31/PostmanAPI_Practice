import express from 'express';
const app = express();
import api from './routes/index.js';

app.use(express.json());
app.use('/api', api);

app.get('/', (req, res) => {
    res.send('Welcome to the Movie API');
  });

export default app;