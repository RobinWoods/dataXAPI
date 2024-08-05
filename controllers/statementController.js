const Statement = require('../models/statementModel');


async function createStatement(req, res, next){
    if(!req.body){
        res.status(400).send({message : "Il faut du contenu"});
    }
    try{
        const newStatement = new Statement(req.body);
        await Statement.create(newStatement);
        res.json({message : 'Relevé ajouté avec succès'});
    }
    catch(error){
        next(error);
    }
}

async function getTotalEmmissionGreenHouse(req, res, next){
    if(!req.params){
        res.status(400).send({message : "Il faut du contenu"});

    }
    try{
        res.json(await Statement.totalEmissionGreenHouse(req.params.annee));
    }
    catch(error){
        next(error);
    }
}

async function getTotalEmission(req, res, next){
    try{
        if(req.params.annee == 'noDate'){
            if(req.params.nomRegion == 'noRegion'){
                res.json(await Statement.totalEmmissionOfAllTimeAndAllRegions());
            }
            else{

                res.json(await Statement.totalEmissionByRegion(req.params.nomRegion));
            }
        }
        else{
            if(req.params.nomRegion == 'noRegion'){
                res.json(await Statement.totalEmissionByYear(req.params.annee));
            }
            else{
                res.json(await Statement.totalEmissionByYearAndRegion(req.params.nomRegion, req.params.annee));
            }
        }
    }
    catch(error){
        next(error);
    }
}

async function getAllStatements(req, res, next){
    try{
        res.json(await Statement.getAll());
    }
    catch (error){
        next(error);
    }
}

module.exports = {
    createStatement,
    getTotalEmmissionGreenHouse,
    getTotalEmission,
    getAllStatements
}