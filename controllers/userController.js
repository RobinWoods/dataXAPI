const User = require('../models/userModel');
const { createHash } = require('crypto');

function hashSHA256 (string){
   return createHash('sha256').update(string).digest('hex');
}

async function getAllUsers(req, res, next){
    try{
        const users = await User.findAllUsers()
        res.json(users);
    }
    catch (error){
        next(error);
    }
}

// Fonction pour récupérer un utilisateur par son ID
async function getUserById(req, res, next) {
    try {
        const user = await User.findUserById(req.params.id)
        res.json(user);
    } catch (error) {
        next(error);
    }
}

async function createNewUser(req, res, next){
    try{
        const {nom, prenom, role, username, password} = req.body;
        const hashedPassword = hashSHA256(password);
        await User.createUser(nom, prenom, role, username, hashedPassword);
        res.status(201).json('Utilisateur ajouté avec succès');

    } catch (error){
        next(error);
    }
}

async function updateUser(req, res, next){
    try{
        const idRequest = req.params.id;
        const userRequest = req.body;
        for (let i=0; i<Object.keys(userRequest).length; i++){
            if(Object.keys(userRequest)[i] == 'password'){
                const hashedPassword = hashSHA256( userRequest[Object.keys(userRequest)[i]]);
                res.json(await User.updateUser(idRequest,Object.keys(userRequest)[i],hashedPassword));
            }
            else {
                res.json(await User.updateUser(idRequest, Object.keys(userRequest)[i], userRequest[Object.keys(userRequest)[i]]));
            }
        }
    }
    catch (error){
        next(error);
    }
}

// Fonction pour supprimer un utilisateur
async function deleteUser(req, res, next) {
    try {
        res.json(await User.deleteUser(req.params.id));
    } catch (error) {
        next(error);
    }
}

async function login(req, res, next){
    try{
        const {username, password} = req.body;
        const hash = (await User.login(username, password)).hash;
        const passwordHashed = createHash('sha256').update(password).digest('hex');
        const jeton = (await User.login(username, password)).jeton;

        if(hash == passwordHashed){
            res.cookie('jwt',jeton, { httpOnly: true });
            res.send('Token JWT envoyé dans un cookie.');
        }
        else{
            next();
        }


    } catch (error){
        next(error);
    }
}


module.exports = {
    getAllUsers,
    getUserById,
    createNewUser,
    updateUser,
    deleteUser,
    login
};
