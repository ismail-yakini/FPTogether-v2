const db = require('../config/db');
const bcrypt = require('bcrypt');


class User{

    constructor(firstname, lastname, email, password, image, id = null){
        this.id = id;
		this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.image = image;
    }



    async isEmailExist() {
        return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users WHERE email = ?', [this.email], (err, result) => {
            if (err) return reject(err);
            resolve(result.length > 0); 
            });
        });
    }

    

    async save() {
        try {
            const exists = await this.isEmailExist();
            if (exists) {
              throw new Error('Email already in use');
            }

            const hashedPassword = await bcrypt.hash(this.password, 10);
            const sql = `
              INSERT INTO users (firstName, lastName, email, password, image)
              VALUES (?, ?, ?, ?, ?)
            `;
            const values = [this.firstname, this.lastname, this.email, hashedPassword, this.image];

            return new Promise((resolve, reject) => {
              db.query(sql, values, (err, result) => {
                if (err) return reject(err);
                resolve(result);
              });
            });

        } catch (err) {
            throw err;
        }
  	}


	// static async findByEmail(email) {
	// 	const [rows] = await db.execute(
	// 		'SELECT * FROM Users WHERE email = ?',
	// 	  	[email]
	// 	);
	// 	return rows[0]; // if user found, return the first one
	// }


	static async findByEmail(email) {
		const [rows] = await db.query('SELECT id, firstname, lastname, email, password, image FROM Users WHERE email = ?', [email]);
		
		// const result = await db.execute('SELECT * FROM Users WHERE email = ?', [email]);
		// console.log("*************************************");
		// console.log(result);
		// console.log("*************************************");
		if (rows.length > 0) {
		  const userData = rows[0];
		  return new User(
			userData.firstname,
			userData.lastname,
			userData.email,
			userData.password,
			userData.image,
			userData.id

		  );
		}
		
		return null; // User not found
	  }


}


module.exports = User;