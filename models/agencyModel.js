const db = require('../db/db');
const {promise} = require("bcrypt/promises");

const Agency = function(agency){
    this.telephoneAgence = agency.telephoneAgence;
    this.mailAgence = agency.mailAgence;
    this.adresseAgence = agency.adresseAgence;
    this.idVille = agency.idVille;

}


Agency.create = (newAgency) =>{
    return new Promise((resolve, reject) =>{
        db.query('INSERT INTO AGENCES SET ?', [newAgency], (error, results)=>{
            if(error){
                reject(error);
            }
            else {
                resolve(results);
            }
        });
    });

}


Agency.findAll = ()=>{
    return new Promise((resolve, reject)=>{
        db.query('SELECT telephoneAgence, mailAgence, adresseAgence, nomVille FROM AGENCES JOIN VILLES ON VILLES.idVille = AGENCES.idVille', (error, results)=>{
            if(error){
                reject(error);
            }
            else{
                resolve(results);
            }
        })
    })
}

Agency.findCity = ()=>{
    return new Promise((resolve, reject)=>{
        db.query('SELECT DISTINCT nomVille FROM AGENCES JOIN VILLES ON AGENCES.idVille = VILLES.idVille', (error, result)=>{
            if(error){
                reject(error);
            }
            else{
                resolve(result);
            }
        })
    })
}

module.exports = Agency;