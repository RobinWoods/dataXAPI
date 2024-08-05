const db = require('../db/db');
const jwt = require('jsonwebtoken');
function generateJWT(username, role) {
    const payload = {
        username: username,
        role : role
    };
    const options = {
        expiresIn : '1h'
    };
    const token = jwt.sign(payload, 'secret_key', options);
    return token;
}

const User = {


    createUser: function(nom, prenom, role, username, password){
        return new Promise((resolve, reject)=>{
            db.query('INSERT INTO users (nom, prenom, role, username, password) VALUES (?, ?, ?, ?, ?)', [nom, prenom, role, username, password], (error, results) =>{
                if (error){
                    reject(error);
                }
                else{
                    resolve(results);
                }
            });
        });
    },

    updateUser: function(id, attribute, attributeValue){
        return new Promise((resolve, reject) =>{
            db.query(`UPDATE users SET ${attribute} = ? WHERE idUser = ?`, [attributeValue, id], (error,results) =>{
                if (error){
                    reject(error);
                }
                else if(results.affectedRows === 0){
                    resolve({ message: 'Utilisateur non trouvé' });
                }
                else{
                    resolve(results);
                }
            })
        })
    },

    deleteUser: function(id) {
        return new Promise((resolve, reject) =>{
            db.query('DELETE FROM users WHERE idUser = ?', [id], (error, results)=>{
                if (error){
                    reject(error);
                }
                else if(results.affectedRows === 0){
                    resolve({message : 'Utilisateur non trouvé'});
                }
                else {
                    resolve(results);
                }
            })
        })
    },

    login: function(username, password){
        return new Promise((resolve, reject) =>{
            db.query(`SELECT * FROM users WHERE username = ? `,[username], (error, results)=>{
                if(error){
                    reject(error);
                }
                else {
                    const role = results[0].role;
                    const jeton = generateJWT(username, role);
                    const hash = results[0].password;
                    const retour = {jeton, hash};
                    resolve(retour);
                }
            })
        })
    }
};

module.exports = User;
