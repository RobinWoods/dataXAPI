const Staff = require('../models/staffModel');
const City = require('../models/cityModel');
const {createHash} = require("crypto");
const jwt = require("jsonwebtoken");

function hashSHA256 (string){
    return createHash('sha256').update(string).digest('hex');
}

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

async function createStaff(req, res, next){

    if(!req.body){
        res.status(400).send({message : "Il faut du contenu"});
    }

    const idCity = await City.getIdByName(req.body.nomVille);
    const idAgency = await City.getIdByName(req.body.nomVilleAgence);

    const newStaff = new Staff({
        nomAgent : req.body.nomAgent,
        prenomAgent : req.body.prenomAgent,
        dateNaissanceAgent : req.body.dateNaissanceAgent,
        telephoneAgent : req.body.telephoneAgent,
        mailAgent : req.body.mailAgent,
        hash : hashSHA256(req.body.passwordAgent),
        poste : req.body.poste,
        datePriseDePoste : req.body.datePriseDePoste,
        idVille : idCity[0].idVille,
        idAgence : idAgency[0].idVille
    })
    try{
        await Staff.create(newStaff);
        res.status(201).json('Personnel ajouté avec succès');
    }
    catch (error){
        next(error);
    }
}

async function getStaff(req, res, next){
    try{
        if(req.params.nomVille == 'all'){
            if(req.params.poste == 'all'){
                res.json(await Staff.getAll());
            }
            else{
                res.json(await Staff.getByPost(req.params.poste));
            }
        }
        else{
            const idCity = (await City.getIdByName(req.params.nomVille))[0].idVille;
            if(req.params.poste == 'all'){
                res.json(await Staff.getByCity(idCity));
            }
            else{
                res.json(await Staff.getByCityAndPost(idCity, req.params.poste));
            }
        }
    }
    catch (error){
        next(error);
    }
}

async function login(req, res, next){
    try{
        const username = req.params.mailAgent
        const staffInfos = await Staff.getHashByMail(username);
        const bddHash = staffInfos[0].hash;
        const postPassword = req.body.password;
        const postHash = hashSHA256(postPassword);
        const poste = (await Staff.getByMail(username))[0].poste;
        if(bddHash == postHash){
            const jeton = generateJWT(username, poste);
            res.cookie('jwt',jeton, { httpOnly: false });
            res.send('Token ajouté dans un cookie');
        }
        else{
            res.send('Identifiants Invalides');
        }
    }
    catch (error){
        next(error);
    }
}

async function getPostByToken(req, res, next){
    try{
        res.json(req.user.role);
    }
    catch (error){
        next(error);
    }
}

async function getStaffByToken(req, res, next){
    try{
        res.json(await Staff.getByMail(req.user.username));
    }
    catch(error){
        next(error);
    }
}

module.exports = {
    createStaff,
    getStaff,
    login,
    getPostByToken,
    getStaffByToken
}