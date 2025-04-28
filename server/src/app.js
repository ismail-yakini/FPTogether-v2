require('dotenv').config({path: __dirname + '/../.env'});
// console.log('DB_USER from .env:', process.env.DB_USER);
const express = require('express');
const cors = require('cors'); // Import cors package
const app = express();
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');


// Enable CORS for all domains or specify a specific domain if needed
app.use(cors());  // This will allow all origins by default

app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', postRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  // window.location.href('HomPage.html');

});
