const db = require('../config/db');
const { use } = require('../src/routes/userRoutes');


class Post{

    constructor(title, description, userid, id = null){
        this.id = id;
		this.title = title;
        this.description = description;
        this.userid = userid;

    }




	// async isEmailExist() {
	// 	const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [this.email]);
	// 	return rows.length > 0;
	//   }

    

    async save() {
		
        try {
            // const exists = await this.isEmailExist();
            // if (exists) {
            //   throw new Error('Email already in use');
            // }
			
            // const hashedPassword = await bcrypt.hash(this.password, 10);
			// console.log(hashedPassword);
            const sql = `
              INSERT INTO Posts (Title, Description, UserId)
              VALUES (?, ?, ?)
            `;
            const values = [this.title, this.description, this.userid];


			const [result] = await db.execute(sql, values);


			this.id = result.insertId;

			// return result;

        } catch (err) {
            throw err;
        }
  	}

    
    
    static async getAllPosts() {
        try {
            
            // const [rows] = await db.query('SELECT * FROM posts ORDER BY Created_at DESC');
            const [rows] = await db.query(`Select Posts.Id, Users.firstname, Users.lastname, Posts.Title, Posts.Description, Posts.UserId, Users.email, DATE_FORMAT(Posts.Created_at, '%d/%m/%Y') AS Created_at from Posts inner join Users on Posts.Userid = Users.id order by Posts.Id Desc;`);
            // const [rows] = await db.query('SELECT * FROM posts');
            return rows;
        } catch (error) {
            throw error;
        }
    }
    



	// static async findByEmail(email) {
	// 	const [rows] = await db.query('SELECT id, firstname, lastname, email, password, image FROM Users WHERE email = ?', [email]);
		
	// 	// const result = await db.execute('SELECT * FROM Users WHERE email = ?', [email]);
	// 	// console.log("*************************************");
	// 	// console.log(result);
	// 	// console.log("*************************************");
	// 	if (rows.length > 0) {
	// 	  const userData = rows[0];
	// 	  return new User(
	// 		userData.firstname,
	// 		userData.lastname,
	// 		userData.email,
	// 		userData.password,
	// 		userData.image,
	// 		userData.id

	// 	  );
	// 	}
		
	// 	return null; // User not found
	//   }


}


module.exports = Post;