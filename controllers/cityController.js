const City = require('../models/cityModel');
const Region = require('../models/regionModel');


async function createCity(req, res, next){
    try{
        const nomVille = req.body.nomVille;
        const codePostal = req.body.codePostal;
        const idRegion = (await Region.getIdByName(req.body.nomRegion))[0].idRegion;

        const newCity = new City({
            nomVille,
            codePostal,
            idRegion});

        await City.create(newCity);

        res.json({message : 'Ville ajoutée avec succès'});
    }
    catch(error){
        next(error);
    }

}

async function getAllCities(req,res, next){
    try{
        res.json(await City.getAll());
    }
    catch (error) {
        next(error);
    }
}

module.exports = {
    createCity,
    getAllCities
}