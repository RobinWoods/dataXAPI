const Captor = require('../models/captorModel');
const City = require('../models/cityModel');
const Gas = require('../models/gasModel');
const Sector = require('../models/sectorModel');
const Staff = require('../models/staffModel');
const Region = require("../models/regionModel");

async function createCaptor(req, res, next){
    try{
        if(!req.body){
            res.status(400).send({message : "Il faut du contenu"});
        }
        const idCity = (await City.getIdByName(req.body.nomVille))[0].idVille;
        const idGas = (await Gas.getIdByFormula(req.body.nomGaz))[0].idGaz;
        const idSector =(await Sector.getIdByName(req.body.nomSecteur))[0].idSecteur;
        const idStaff =(await Staff.getIdByMail(req.user.username))[0].idAgent;
    
        const newCaptor = new Captor({
            idVille : idCity,
            idGaz : idGas,
            idSecteur : idSector,
            idAgent: idStaff,
        });
        await Captor.create(newCaptor)
        res.send({message : 'Capteur ajouté avec succès'});
    }
    catch(error){
        next(error);
    }
}

async function getAllCaptor(req, res, next){
    try{
        res.json(await Captor.getAll());
    }
    catch(error){
        next(error);
    }
}

async function getRegionOverEquiped(req, res, next){
    try{
        res.json(await Captor.overEquiped());
    }
    catch (error){
        next(error);
    }
}

module.exports = {
    createCaptor,
    getAllCaptor,
    getRegionOverEquiped
}