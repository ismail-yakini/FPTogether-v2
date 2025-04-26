const db = require('../config/db');
const bcrypt = require('bcrypt');


class User{

    constructor(firstname, lastname, email, password, image){
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
            resolve(result.length > 0); // true if email exists
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

}


module.exports = User;