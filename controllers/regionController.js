const Region = require('../models/regionModel');

async function getIdRegionByName(req,res){
    if(!req.body){
        res.status(400).send({message : "Il faut du contenu"});
    }

    const region = req.params.nomRegion;

    Region.getIdByName(region, (data, err)=>{
        if (err){
            res.status(500).send({message: err.message || "Une erreur est apparue pendant la récupération de l'idRegion"});
        }
        else {
            res.send(data);
        }
    })
}

async function createRegion(req, res, next){
    try{
        const newRegion = new Region(req.body);
        await Region.create(newRegion);
        res.json({message : 'Region ajoutée avec succès'});
    }
    catch (error){
        next(error);
    }
}

async function getAllRegion(req, res, next){
    try{
        res.json(await Region.getAll());
    }
    catch (error) {
        next(error);
    }
}


module.exports = {
    getIdRegionByName,
    createRegion,
    getAllRegion
}