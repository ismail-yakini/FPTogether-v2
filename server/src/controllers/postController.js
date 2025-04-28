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

    const userid = req.user.id;

	if(!title || !description || !userid){

		return res.status(400).json({error : "All fields are required"});
	}
	try{
		
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


