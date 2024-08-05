const Agency = require('../models/agencyModel');
const City = require('../models/cityModel');
async function createAgency(req, res, next){
    if(!req.body){
        res.status(400).send({message : "Il faut du contenu"});
    }

    const newAgency = new Agency(req.body);
    try{
        res.json(await Agency.create(newAgency));
    }
    catch(error){
        next(error);
    }
}

async function findAllAgencies(req, res, next){

    try {
        res.json(await Agency.findAll());

    }
    catch(error){
        next(error);
    }
}

async function findAllCities(req, res, next){
    try{
        res.json(await Agency.findCity());
    }
    catch (error){
        next(error);
    }
}

module.exports = {
    createAgency,
    findAllAgencies,
    findAllCities
}