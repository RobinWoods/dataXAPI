const db = require('../db/db');

const City = function(city){
    this.nomVille = city.nomVille;
    this.codePostal = city.codePostal;
    this.idRegion =city.idRegion;
}

City.create = (newCity)=>{
    return new Promise((resolve, reject)=>{
        db.query('INSERT INTO VILLES SET ?', [newCity], (error, results)=>{
            if(error){
                reject(error);
            }
            else{
                resolve(results);
            }
        });
    });

}

City.getIdByName = (nameCity)=>{
    return new Promise((resolve, reject)=>{
        db.query('SELECT idVille FROM VILLES WHERE nomVille = ?', [nameCity], (error, results)=>{
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

City.getNameById = (idCity)=>{
    return new Promise((resolve, reject)=>{
        db.query('SELECT nomVille FROM VILLES WHERE idVille = ? ', [idCity], (error, results)=>{
            if(error){
                reject(error);
            }
            else{
                resolve(results);
            }
        });
    });
}

City.getAllWithAgency = ()=>{
    return new Promise((resolve, reject)=>{
        db.query('SELECT DISTINCT nomVille FROM VILLES JOIN AGENCES ON AGENCES.idVille = VILLES.idVille', (error, results)=>{
            if(error){
                reject(error);
            }
            else{
                resolve(results);
            }
        })
    })
}

City.getAll =()=>{
    return new Promise((resolve, reject)=>{
        db.query('SELECT DISTINCT * FROM VILLES', (error, results)=>{
            if(error){
                reject(error);
            }
            else{
                resolve(results);
            }
        })
    })
}

module.exports = City;