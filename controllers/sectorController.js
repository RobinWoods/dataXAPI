const Sector = require('../models/sectorModel');

async function getIdSectorByName(req,res){
    if(!req.params){
        res.status(400).send({message : "Il faut du contenu"});
    }

    const sector = req.params.nomSecteur;

    Sector.getIdByName(sector, (data, err)=>{
        if (err){
            res.status(500).send({message: err.message || "Une erreur est apparue pendant la récupération de l'idSecteur"});
        }
        else res.send(data);
    })
}

async function getSectorPollution(req, res, next){
    try{
        if(req.params.nomRegion == 'noRegion'){
            res.json(await Sector.getPollutionOfAllRegions());
        }
        else{
            res.json(await Sector.getPollutionByRegion(req.params.nomRegion));
        }
    }
    catch (error){
        next(error);
    }
}

async function getAllSector(req, res, next){
    try{
        res.json(await Sector.getAll());
    }
    catch (error){
        next(error);
    }
}

module.exports = {
    getIdSectorByName,
    getSectorPollution,
    getAllSector
}