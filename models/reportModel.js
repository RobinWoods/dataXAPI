const db = require('../db/db');
const e = require("express");

const Report = function (report){
    this.nomRapport = report.nomRapport;
    this.dateParution = report.dateParution;
}

Report.create= (newReport)=>{
    return new Promise((resolve, reject)=>{
        db.query('INSERT INTO RAPPORTS SET ?', [newReport], (error, results)=>{
            if(error){
                reject(error);
            }
            else{
                resolve(results);
            }
        });
    });
}

Report.createTreatement = (captureId, reportId)=>{
    return new Promise((resolve, reject)=>{
        db.query('INSERT INTO TRAITER VALUES (?, ?)', [captureId, reportId], (error, results)=>{
            if(error){
                reject(error);
            }
            else{
                resolve(results);
            }
        })
    })
}

Report.createRedation = (agentId, reportId)=>{
    return new Promise((resolve, reject)=>{
        db.query('INSERT INTO REDIGER VALUES (?, ?)', [agentId, reportId], (error, results)=>{
            if(error){
                reject(error);
            }
            else{
                resolve(results);
            }
        })
    })
}

Report.getInTime = (startDate, finishDate)=>{
    return new Promise((resolve, reject)=>{
        db.query('SELECT * FROM RAPPORTS WHERE dateParution BETWEEN ? AND ? ORDER BY RAPPORTS.dateParution', [startDate, finishDate], (error, results)=>{
            if(error){
                reject(error);
            }
            else{
                resolve(results);
            }
        })
    })
}

Report.orderByGazAndTime = (gazFormula, startDate, finishDate)=>{
    return new Promise((resolve, reject)=>{
        db.query('SELECT DISTINCT RAPPORTS.idRapport, RAPPORTS.nomRapport, RAPPORTS.dateParution FROM RAPPORTS JOIN TRAITER ON RAPPORTS.idRapport = TRAITER.idRapport JOIN RELEVES ON TRAITER.idCapture = RELEVES.idCapture JOIN CAPTEURS ON RELEVES.idCapteur = CAPTEURS.idCapteur JOIN GAZ ON CAPTEURS.idGaz = GAZ.idGaz WHERE GAZ.formuleGaz = ? AND dateParution BETWEEN ? AND ? ORDER BY RAPPORTS.dateParution', [gazFormula, startDate, finishDate], (error, results)=>{
            if(error){
                reject(error);
            }
            else{
                resolve(results);
            }
        })
    })
}


Report.getAllYear = ()=>{
    return new Promise((resolve, reject)=>{
        db.query('SELECT DISTINCT YEAR(RAPPORTS.dateParution) AS "Annee" FROM RAPPORTS ORDER BY Annee ', (error, results)=>{
            if(error){
                reject(error);
            }
            else{
                resolve(results);
            }
        })
    })
}

module.exports = Report;