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
      { id: user.id, email: user.email }, 
      process.env.JWT_SECRET,           
      { expiresIn: '1h' }  
    );

    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


