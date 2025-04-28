const db = require('../config/db');
const { use } = require('../src/routes/userRoutes');


class Post{

    constructor(title, description, userid, id = null){
        this.id = id;
		this.title = title;
        this.description = description;
        this.userid = userid;

    }


    async save() {
		
        try {
           
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
            const [rows] = await db.query(`Select Posts.Id, Users.firstname, Users.lastname, Posts.Title, Posts.Description, Posts.UserId, Users.email, DATE_FORMAT(Posts.Created_at, '%d/%m/%Y') AS Created_at from Posts inner join Users on Posts.Userid = Users.id order by Posts.Id Desc;`);
            return rows;
        } catch (error) {
            throw error;
        }
    }
    

}


module.exports = Post;