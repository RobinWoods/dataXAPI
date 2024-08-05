const db = require('../db/db');

const Sector = function(sector){
    this.nomSecteur = sector.nomSecteur;
}

Sector.getIdByName = (sectorName)=>{
    return new Promise((resolve, reject)=>{
        db.query('SELECT idSecteur FROM SECTEURS WHERE nomSecteur = ?', sectorName, (error, results)=>{
            console.log(results.affectedRows);
            if (error){
                reject(error);
            }
            else if(results.affectedRows === 0 ){
                resolve({ message: 'Table vide' });
            }
            else if(results.length === 0){
                resolve({message: 'Secteur non trouvé'});
            }
            else{
                resolve(results);
            }
        });
    });
}

Sector.getIdByName = (nameSector)=>{
    return new Promise((resolve, reject)=>{
        db.query('SELECT idSecteur FROM SECTEURS WHERE nomSecteur = ?', [nameSector], (error, results)=>{
            if(error){
                reject(error);
            }
            else if(results.affectedRows === 0){
                reject({ message: 'Table vide' });
            }
            else{
                resolve(results);
            }
        });
    });
}

Sector.getPollutionByRegion = (nameRegion)=>{
    return new Promise((resolve, reject)=>{
        db.query('SELECT SUM(RELEVES.donnee) AS Pollution, REGIONS.nomRegion, SECTEURS.nomSecteur FROM RELEVES JOIN CAPTEURS ON CAPTEURS.idCapteur = RELEVES.idCapteur JOIN SECTEURS ON CAPTEURS.idSecteur = SECTEURS.idSecteur JOIN VILLES ON CAPTEURS.idVille = VILLES.idVille JOIN REGIONS ON REGIONS.idRegion = VILLES.idRegion WHERE nomRegion = ? GROUP BY SECTEURS.nomSecteur, REGIONS.nomRegion ORDER BY Pollution LIMIT 1', [nameRegion], (error, results)=>{
            if(error){
                reject(error);
            }
            else{
                resolve(results);
            }
        })
    })

}

Sector.getPollutionOfAllRegions = ()=>{
    return new Promise((resolve, reject)=>{
        db.query('SELECT SUM(RELEVES.donnee) AS Pollution, REGIONS.nomRegion, SECTEURS.nomSecteur FROM RELEVES JOIN CAPTEURS ON CAPTEURS.idCapteur = RELEVES.idCapteur JOIN SECTEURS ON CAPTEURS.idSecteur = SECTEURS.idSecteur JOIN VILLES ON CAPTEURS.idVille = VILLES.idVille JOIN REGIONS ON REGIONS.idRegion = VILLES.idRegion GROUP BY SECTEURS.nomSecteur, REGIONS.nomRegion ORDER BY Pollution LIMIT 1', (error, results)=>{
            if(error){
                reject(error);
            }
            else{
                resolve(results);
            }
        })
    })
}

Sector.getAll = ()=>{
    return new Promise((resolve, reject)=>{
        db.query('SELECT DISTINCT * FROM SECTEURS', (error, results)=>{
            if(error){
                reject(error);
            }
            else{
                resolve(results);
            }
        })
    })
}

module.exports = Sector;
