require('dotenv').config({path: __dirname + '/../.env'});
// console.log('DB_USER from .env:', process.env.DB_USER);
const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');


app.use(express.json());
app.use('/api', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
