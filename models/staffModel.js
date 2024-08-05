const db = require('../db/db');

const Staff = function(staff){
    this.nomAgent = staff.nomAgent;
    this.prenomAgent = staff.prenomAgent;
    this.dateNaissanceAgent = staff.dateNaissanceAgent;
    this.telephoneAgent = staff.telephoneAgent;
    this.mailAgent = staff.mailAgent;
    this.hash = staff.hash; 
    this.poste = staff.poste;
    this.datePriseDePoste = staff.datePriseDePoste;
    this.idVille = staff.idVille;
    this.idAgence = staff.idAgence;
}

Staff.create = (newStaff)=>{
    return new Promise((resolve, reject)=>{
        db.query('INSERT INTO PERSONNEL SET ?', [newStaff], (error, results)=>{
            if (error){
                reject(error);
            }
            else{
                resolve(results);
            }
        });
    });

}

Staff.getIdByName = (firstName, lastName, mail)=>{
    return new Promise((resolve, reject)=>{
        db.query('SELECT idAgent FROM PERSONNEL WHERE (prenomAgent, nomAgent, mailAgent)  = (?, ?, ?)', [firstName, lastName, mail], (error, results)=>{
            if(error){
                reject(error);
            }
            else{
                resolve(results);
            }
        })
    })
}

Staff.getAll = ()=>{
    return new Promise((resolve, reject)=>{
        db.query('SELECT PERSONNEL.idAgent, PERSONNEL.nomAgent, PERSONNEL.prenomAgent, PERSONNEL.poste, VILLES.nomVille, GAZ.acidifiant, GAZ.effetDeSerre, (COUNT(REDIGER.idRapport)/(YEAR(NOW())-YEAR(PERSONNEL.datePriseDePoste))) AS `Taux de productivité (rapports/an)` FROM PERSONNEL LEFT JOIN REDIGER ON PERSONNEL.idAgent = REDIGER.idAgent LEFT JOIN RAPPORTS ON REDIGER.idRapport = RAPPORTS.idRapport LEFT JOIN VILLES ON PERSONNEL.idVille = VILLES.idVille LEFT JOIN CAPTEURS ON PERSONNEL.idAgent = CAPTEURS.idAgent LEFT JOIN GAZ ON CAPTEURS.idGaz = GAZ.idGaz GROUP BY PERSONNEL.idAgent, prenomAgent, nomAgent, poste, VILLES.nomVille, GAZ.acidifiant, GAZ.effetDeSerre', (error, results)=>{
            if(error){
                reject(error);
            }
            else{
                resolve(results);
            }
        })
    })
}

Staff.getByPost = (post)=>{
    return new Promise((resolve, reject)=>{
        db.query('SELECT PERSONNEL.idAgent, PERSONNEL.nomAgent, PERSONNEL.prenomAgent, PERSONNEL.poste, VILLES.nomVille, GAZ.acidifiant, GAZ.effetDeSerre, (COUNT(REDIGER.idRapport)/(YEAR(NOW())-YEAR(PERSONNEL.datePriseDePoste))) AS `Taux de productivité (rapports/an)` FROM PERSONNEL LEFT JOIN REDIGER ON PERSONNEL.idAgent = REDIGER.idAgent LEFT JOIN RAPPORTS ON REDIGER.idRapport = RAPPORTS.idRapport LEFT JOIN VILLES ON PERSONNEL.idVille = VILLES.idVille LEFT JOIN CAPTEURS ON PERSONNEL.idAgent = CAPTEURS.idAgent LEFT JOIN GAZ ON CAPTEURS.idGaz = GAZ.idGaz WHERE PERSONNEL.poste = ? GROUP BY PERSONNEL.idAgent, prenomAgent, nomAgent, poste, VILLES.nomVille, GAZ.acidifiant, GAZ.effetDeSerre', [post], (error, results)=>{
            if(error){
                reject(error);
            }
            else{
                resolve(results);
            }
        })
    })
}

Staff.getByCity = (idCity)=>{
    return new Promise ((resolve, reject)=>{
        db.query('SELECT PERSONNEL.idAgent, PERSONNEL.nomAgent, PERSONNEL.prenomAgent, PERSONNEL.poste, VILLES.nomVille, GAZ.acidifiant, GAZ.effetDeSerre, (COUNT(REDIGER.idRapport)/(YEAR(NOW())-YEAR(PERSONNEL.datePriseDePoste))) AS `Taux de productivité (rapports/an)` FROM PERSONNEL LEFT JOIN REDIGER ON PERSONNEL.idAgent = REDIGER.idAgent LEFT JOIN RAPPORTS ON REDIGER.idRapport = RAPPORTS.idRapport LEFT JOIN VILLES ON PERSONNEL.idVille = VILLES.idVille LEFT JOIN CAPTEURS ON PERSONNEL.idAgent = CAPTEURS.idAgent LEFT JOIN GAZ ON CAPTEURS.idGaz = GAZ.idGaz LEFT JOIN AGENCES ON PERSONNEL.idAgence = AGENCES.idAgence WHERE AGENCES.idVille = ? GROUP BY PERSONNEL.idAgent, prenomAgent, nomAgent, poste, VILLES.nomVille, GAZ.acidifiant, GAZ.effetDeSerre', [idCity], (error, results)=>{
            if(error){
                reject(error);
            }
            else{
                resolve(results);
            }
        })
    })
}

Staff.getByCityAndPost = (idCity, post)=>{
    return new Promise((resolve, reject)=>{
        db.query('SELECT PERSONNEL.idAgent, PERSONNEL.nomAgent, PERSONNEL.prenomAgent, PERSONNEL.poste, VILLES.nomVille, GAZ.acidifiant, GAZ.effetDeSerre, (COUNT(REDIGER.idRapport)/(YEAR(NOW())-YEAR(PERSONNEL.datePriseDePoste))) AS `Taux de productivité (rapports/an)` FROM PERSONNEL LEFT JOIN REDIGER ON PERSONNEL.idAgent = REDIGER.idAgent LEFT JOIN RAPPORTS ON REDIGER.idRapport = RAPPORTS.idRapport LEFT JOIN VILLES ON PERSONNEL.idVille = VILLES.idVille LEFT JOIN CAPTEURS ON PERSONNEL.idAgent = CAPTEURS.idAgent LEFT JOIN GAZ ON CAPTEURS.idGaz = GAZ.idGaz LEFT JOIN AGENCES ON PERSONNEL.idAgence = AGENCES.idAgence WHERE AGENCES.idVille = ? AND PERSONNEL.poste = ? GROUP BY PERSONNEL.idAgent, prenomAgent, nomAgent, poste, VILLES.nomVille, GAZ.acidifiant, GAZ.effetDeSerre', [idCity, post], (error, results)=>{
            if(error){
                reject(error);
            }
            else{
                resolve(results);
            }
        })
    })
}

Staff.getByMail = (mail)=>{
    return new Promise((resolve, reject) =>{
        db.query(`SELECT idAgent, nomAgent, prenomAgent, dateNaissanceAgent, telephoneAgent, mailAgent, poste, datePriseDePoste, idVille, idAgence FROM PERSONNEL WHERE mailAgent = ? `,[mail], (error, results)=>{
            if(error){
                reject(error);
            }
            else {
                resolve(results);
            }
        })
    })
}

Staff.getHashByMail = (mail)=>{
    return new Promise((resolve, reject)=>{
        db.query(`SELECT hash FROM PERSONNEL WHERE mailAgent = ?`, [mail], (error, results)=>{
            if(error){
                reject(error);
            }
            else{
                resolve(results);
            }
        })
    })
}

Staff.getIdByMail = (mail)=>{
    return new Promise((resolve, reject) =>{
        db.query(`SELECT idAgent FROM PERSONNEL WHERE mailAgent = ? `,[mail], (error, results)=>{
            if(error){
                reject(error);
            }
            else {
                resolve(results);
            }
        })
    })
}


module.exports = Staff;
