const db = require('../../config/db');

const User = require('../../models/User');
const multer = require('multer');
const path = require('path');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });


exports.createUser = async (req, res) => {

	const { firstname, lastname, email, password } = req.body;
	// console.log(req.body);
	if(!firstname || !lastname || !email || !password){
		// console.log("MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM");
		return res.status(400).json({error : "All fields are required"});
	}
	try{
		
		// const imageName = req.file ? req.file.filename : null;
		const newUser = new User(
			firstname,
			lastname,
			email,
			password,
			// imageName
			null
		);
		
		
		await newUser.save();
		
		const token = jwt.sign(
			{ id: newUser.id, email: newUser.email },
			process.env.JWT_SECRET,
			{ expiresIn: '1h' }
		);

		res.status(201).json({ message: 'User created successfully', token});
	}catch(error){
		res.status(400).json({ error: error.message })
	}
	
};



exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findByEmail(email);

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Create token
    const token = jwt.sign(
      { id: user.id, email: user.email }, // You can add more info if you want
      process.env.JWT_SECRET,            // Make sure you add JWT_SECRET in .env
      { expiresIn: '1h' }                 // Token expires after 1 hour
    );

    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};










// // Get all users
// exports.getAllUsers = (req, res) => {
//   db.query('SELECT * FROM users', (err, results) => {
//     if (err) return res.status(500).json({ error: err.message });
//     res.json(results);
//   });
// };

// // Get user by ID
// exports.getUserById = (req, res) => {
//   const { id } = req.params;

//   db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
//     if (err) return res.status(500).json({ error: err.message });
//     if (results.length === 0) return res.status(404).json({ error: 'User not found' });
//     res.json(results[0]);
//   });
// };
