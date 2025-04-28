const db = require('../../config/db');

const Post = require('../../models/Post');

const jwt = require('jsonwebtoken');




exports.getAllPosts = async (req, res) => {
    try {
      const posts = await Post.getAllPosts();
      res.status(200).json(posts);
    } catch (error) {
      console.error('Error getting posts:', error);
      res.status(500).json({ error: 'Failed to fetch posts' });
    }
};




exports.createPost = async (req, res) => {

	const { title, description} = req.body;
    // console.log(req.user.id);
    // console.log(title);
    // console.log(description);
    const userid = req.user.id;
	// console.log(req.body);
	if(!title || !description || !userid){

		return res.status(400).json({error : "All fields are required"});
	}
	try{
		
		// const imageName = req.file ? req.file.filename : null;
		const newPost = new Post(
			title,
			description,
			userid
		);
		
		
		await newPost.save();
		

		res.status(201).json({ message: 'Post created successfully', token});
	}catch(error){
		res.status(400).json({ error: error.message })
	}
	
};



// exports.loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Find user by email
//     const user = await User.findByEmail(email);

//     if (!user) {
//       return res.status(401).json({ message: 'Invalid email or password.' });
//     }

//     // Compare passwords
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: 'Invalid email or password.' });
//     }

//     // Create token
//     const token = jwt.sign(
//       { id: user.id, email: user.email }, 
//       process.env.JWT_SECRET,           
//       { expiresIn: '1h' }  
//     );

//     res.json({ message: 'Login successful', token });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


