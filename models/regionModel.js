const db = require('../db/db');

const Region = function(region){
    this.nomRegion = region.nomRegion;
}

Region.getIdByName = (regionName)=>{
    return new Promise((resolve, reject)=>{
        db.query(`SELECT idRegion FROM REGIONS WHERE nomRegion = ?`,[regionName], (error, results)=>{

            if (error){
                reject(error);
            }
            else if(results.affectedRows === 0 ){
                resolve({ message: 'Table vide' });
            }
            else if(results.length === 0){
                resolve({message: 'Région non trouvé'});
            }
            else{
                resolve(results);
            }
        });
    });
}



Region.getAll = ()=>{
    return new Promise((resolve, reject)=>{
        db.query('SELECT nomRegion FROM REGIONS', (error, results)=>{
            if(error){
                reject(error);
            }
            else{
                resolve(results);
            }
        })
    })
}

Region.create = (region)=>{
    return new Promise((resolve, reject)=>{
        db.query('INSERT INTO REGIONS SET ?', [region], (error, results)=>{
            if(error){
                reject(error);
            }
            else{
                resolve(results);
            }
        })
    })
}


module.exports = Region;