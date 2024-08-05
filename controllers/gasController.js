const Gas = require('../models/gasModel');


async function createGas(req, res, next){
    if(!req.body){
        res.status(400).send({message : "Il faut du contenu"});
    }
    try{
        const newGas = new Gas(req.body);

        await Gas.create(newGas);
    }
    catch (error){
        next(error);
    }
}

async function getGasByName(req, res, next){
    try{
        res.json(await Gas.getByName(req.params.nomGaz));
    }
    catch (error){
        next(error);
    }
}

async function getReportByGas(req, res, next){
    try{
        res.json(await Gas.getReports(req.params.nomGaz));
    }
    catch(error){
        next(error);
    }

}

async function getAllGas(req, res, next){
    try{
        res.json(await Gas.getAll());
    }
    catch (error){
        next(error);
    }
}


module.exports = {
    createGas,
    getReportByGas,
    getGasByName,
    getAllGas
}