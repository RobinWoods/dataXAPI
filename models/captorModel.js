const db = require('../db/db');

const Captor = function(captor){
    this.idVille = captor.idVille;
    this.idGaz = captor.idGaz;
    this.idSecteur = captor.idSecteur;
    this.idAgent = captor.idAgent;
}

Captor.create = (newCaptor)=>{
    return new Promise((resolve, reject)=>{
        db.query('INSERT INTO CAPTEURS SET ?', [newCaptor], (error, results)=>{
            if(error){
                reject(error);
            }
            else{
                resolve(results);
            }
        });
    });
}

Captor.getAll = ()=>{
    return new Promise((resolve, reject)=>{
        db.query('SELECT * FROM CAPTEURS', (error, results)=>{
            if(error){
                reject(error);
            }
            else{
                resolve(results);
            }
        })
    })
}

Captor.overEquiped = ()=>{
    return new Promise((resolve, reject)=>{
        db.query('SELECT REGIONS.nomRegion, COUNT(DISTINCT AGENCES.idAgence) AS "Nombre d\'Agences", COUNT(DISTINCT CAPTEURS.idCapteur) AS "Nombre de Capteurs" FROM REGIONS JOIN VILLES ON REGIONS.idRegion = VILLES.idRegion JOIN AGENCES ON VILLES.idVille = AGENCES.idVille JOIN CAPTEURS ON VILLES.idVille = CAPTEURS.idVille GROUP BY REGIONS.nomRegion HAVING COUNT(DISTINCT AGENCES.idAgence) < COUNT(DISTINCT CAPTEURS.idCapteur) ORDER BY COUNT(DISTINCT CAPTEURS.idCapteur) DESC', (error, results)=>{
            if(error){
                reject(error);
            }
            else{
                resolve(results);
            }
        })
    })

}

module.exports = Captor;