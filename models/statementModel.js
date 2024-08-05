const db = require('../db/db');

const Statement = function (statement){
    this.donnee = statement.donnee;
    this.dateCapture = statement.dateCapture;
    this.heureCapture = statement.heureCapture;
    this.idCapteur = statement.idCapteur;
}

Statement.create= (newStatement)=>{
    return new Promise(( resolve, reject)=>{
        db.query('INSERT INTO RELEVES SET ?', [newStatement], (error, results)=>{
            if(error){
                reject(error);
            }
            else{
                resolve(results);
            }
        });
    });
}

Statement.totalEmissionGreenHouse = (year)=>{
    return new Promise((resolve, reject)=>{
        db.query('SELECT REGIONS.nomRegion, SUM(RELEVES.donnee) AS somme_effet_de_serre FROM REGIONS JOIN VILLES ON REGIONS.idRegion = VILLES.idRegion JOIN CAPTEURS ON VILLES.idVille = CAPTEURS.idVille JOIN RELEVES ON CAPTEURS.idCapteur = RELEVES.idCapteur JOIN GAZ ON CAPTEURS.idGaz = GAZ.idGaz WHERE GAZ.effetDeSerre = 1 AND YEAR(RELEVES.dateCapture) = ? GROUP BY REGIONS.nomRegion', [year], (error, results)=>{
            if(error){
                reject(error);
            }
            else{
                resolve(results);
            }
        })
    })
}

Statement.totalEmmissionOfAllTimeAndAllRegions = ()=>{
    return new Promise((resolve, reject)=>{
        db.query('SELECT GAZ.nomGaz, GAZ.effetDeSerre, GAZ.acidifiant, REGIONS.nomRegion, SUM(RELEVES.donnee) AS `Somme des émissions` FROM REGIONS JOIN VILLES ON REGIONS.idRegion = VILLES.idRegion JOIN CAPTEURS ON VILLES.idVille = CAPTEURS.idVille JOIN GAZ ON CAPTEURS.idGaz = GAZ.idGaz JOIN RELEVES ON CAPTEURS.idCapteur = RELEVES.idCapture GROUP BY RELEVES.dateCapture, GAZ.nomGaz, RELEVES.idCapture ORDER BY SUM(RELEVES.donnee) DESC',(error, results)=>{
            if(error){
                reject(error);
            }
            else{
                resolve(results);
            }
        })
    })
}

Statement.totalEmissionByRegion = (region)=>{
    return new Promise((resolve, reject)=>{
        db.query('SELECT GAZ.nomGaz,GAZ.effetDeSerre, GAZ.acidifiant, REGIONS.nomRegion,SUM(RELEVES.donnee) AS `Somme des émissions` FROM REGIONS JOIN VILLES ON REGIONS.idRegion = VILLES.idRegion JOIN CAPTEURS ON VILLES.idVille = CAPTEURS.idVille JOIN GAZ ON CAPTEURS.idGaz = GAZ.idGaz JOIN RELEVES ON CAPTEURS.idCapteur = RELEVES.idCapture WHERE REGIONS.nomRegion = ? GROUP BY RELEVES.dateCapture, GAZ.nomGaz, RELEVES.idCapture ORDER BY SUM(RELEVES.donnee) DESC', [region], (error, results)=>{
            if(error){
                reject(error);
            }
            else{
                resolve(results);
            }
        })
    })
}

Statement.totalEmissionByYear = (year)=>{
    return new Promise((resolve, reject)=>{
        db.query('SELECT GAZ.nomGaz,GAZ.effetDeSerre, GAZ.acidifiant, REGIONS.nomRegion, SUM(RELEVES.donnee) AS `Somme des émissions` FROM REGIONS JOIN VILLES ON REGIONS.idRegion = VILLES.idRegion JOIN CAPTEURS ON VILLES.idVille = CAPTEURS.idVille JOIN GAZ ON CAPTEURS.idGaz = GAZ.idGaz JOIN RELEVES ON CAPTEURS.idCapteur = RELEVES.idCapture WHERE YEAR(RELEVES.dateCapture) = ? GROUP BY RELEVES.dateCapture, GAZ.nomGaz, RELEVES.idCapture ORDER BY SUM(RELEVES.donnee) DESC', [year], (error, results)=>{
            if(error){
                reject(error);
            }
            else{
                resolve(results);
            }
        })
    })
}

Statement.totalEmissionByYearAndRegion = (region, year)=>{
    return new Promise((resolve, reject)=>{
        db.query('SELECT GAZ.nomGaz,GAZ.effetDeSerre, GAZ.acidifiant, REGIONS.nomRegion, SUM(RELEVES.donnee) AS `Somme des émissions` FROM REGIONS JOIN VILLES ON REGIONS.idRegion = VILLES.idRegion JOIN CAPTEURS ON VILLES.idVille = CAPTEURS.idVille JOIN GAZ ON CAPTEURS.idGaz = GAZ.idGaz JOIN RELEVES ON CAPTEURS.idCapteur = RELEVES.idCapture WHERE REGIONS.nomRegion = ? AND YEAR(RELEVES.dateCapture) = ? GROUP BY RELEVES.dateCapture, GAZ.nomGaz, RELEVES.idCapture ORDER BY SUM(RELEVES.donnee) DESC', [region, year], (error, results)=>{
            if(error){
                reject(error);
            }
            else{
                resolve(results);
            }
        })
    })
}

Statement.getAll = ()=>{
    return new Promise((resolve, reject)=>{
        db.query('SELECT * FROM RELEVES', (error, results)=>{
            if(error){
                reject(error);
            }
            else{
                resolve(results);
            }
        })
    })
}


module.exports = Statement;