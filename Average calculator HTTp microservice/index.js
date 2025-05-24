require('dotenv').config();
const express = require('express');
const cors = require('cors');
const config = require('./config');
const numberRoutes = require('./routes/numberRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/numbers', numberRoutes);

app.get('/', (req, res) => {
  res.json({
    service: 'Average Calculator Microservice',
    endpoints: {
      '/numbers/p': 'Get prime numbers and their average',
      '/numbers/f': 'Get fibonacci numbers and their average',
      '/numbers/e': 'Get even numbers and their average',
      '/numbers/r': 'Get random numbers and their average'
    },
    windowSize: config.windowSize
  });
});

app.use(errorMiddleware.notFound);
app.use(errorMiddleware.errorHandler);

app.listen(config.port, () => {
  console.log(`Server running on http://localhost:${config.port}`);
});