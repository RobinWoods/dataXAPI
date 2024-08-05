const db = require('../db/db');

const Gas = function (gas){
    this.nomGaz = gas.nomGaz;
    this.formuleGaz = gas.formuleGaz;
    this.typeGaz = gas.typeGaz;
    this.masseMolaire = gas.masseMolaire;
    this.descriptionGaz = gas.descriptionGaz;
    this.effetDeSerre = gas.effetDeSerre;
    this.acidifiant = gas.acidifiant;
}

Gas.create = (newGas)=>{
    return new Promise((resolve, reject)=>{
        db.query('INSERT INTO GAZ SET ?', [newGas], (error, results)=>{
            if(error){
                reject(error);
            }
            else{
                resolve(results);
            }
        });
    });

}

Gas.getByName = (nameGas)=>{
    return new Promise((resolve, reject)=>{
        db.query('SELECT nomGaz, formuleGaz, typeGaz, masseMolaire, descriptionGaz, effetDeSerre, acidifiant FROM GAZ WHERE nomGaz = ?', [nameGas], (error, results)=>{
            if(error){
                reject(error);
            }
            else{
                resolve(results);
            }
        })
    })
}

Gas.getIdByName = (nameGas)=>{
    return new Promise((resolve, reject)=>{
        db.query('SELECT idGaz FROM GAZ WHERE nomGaz = ?', [nameGas], (error, results)=>{
            if(error){
                reject(error);
            }
            else{
                resolve(results);
            }
        })
    })
}

Gas.getReports = (nameGas)=>{
    return new Promise((resolve, reject)=>{
        db.query('SELECT GAZ.nomGaz, RAPPORTS.nomRapport FROM GAZ JOIN CAPTEURS ON GAZ.idGaz = CAPTEURS.idGaz JOIN RELEVES ON CAPTEURS.idCapteur = RELEVES.idCapteur JOIN TRAITER ON RELEVES.idCapture = TRAITER.idCapture JOIN RAPPORTS ON TRAITER.idRapport = RAPPORTS.idRapport WHERE nomGaz = ?', [nameGas], (error, results)=>{
            if(error){
                reject(error);
            }
            else{
                resolve(results);
            }
        })
    })
}

Gas.getAll = ()=>{
    return new Promise((resolve, reject)=>{
        db.query('SELECT DISTINCT * FROM GAZ', (error, results)=>{
            if(error){
                reject(error);
            }
            else{
                resolve(results);
            }
        })
    })
}

Gas.getIdByFormula = (formulaGas)=>{
    return new Promise((resolve, reject)=>{
        db.query('SELECT idGaz FROM GAZ WHERE formuleGaz = ?', [formulaGas], (error, results)=>{
            if(error){
                reject(error);
            }
            else{
                resolve(results);
            }
        })
    })
}


module.exports = Gas;