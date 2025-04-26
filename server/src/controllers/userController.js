const db = require('../../config/db');

const User = require('../../models/User');
const multer = require('multer');
const path = require('path');

// Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });


exports.createUser = async (req, res) => {
	const { firstname, lastname, email, password } = req.body;

	if(!firstname || !lastname || !email || !password){
		return res.status(400).json({error : "All fields are required"});
	}
	try{

		const imageName = req.file ? req.file.filename : null;
		const newUser = new User(
			firstname,
			lastname,
			email,
			password,
			imageName
		);

		await newUser.save();

		res.status(201).json({ message: 'User created successfully'});
	}catch(error){
		res.status(400).json({ error: error.message })
	}
	
};








// Get all users
exports.getAllUsers = (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Get user by ID
exports.getUserById = (req, res) => {
  const { id } = req.params;

  db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'User not found' });
    res.json(results[0]);
  });
};
