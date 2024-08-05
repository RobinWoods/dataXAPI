const Report = require('../models/reportModel');
const Staff = require('../models/staffModel');

async function createReport(req, res, next){
    try{
        if(!req.body){
            res.status(400).send({message : "Il faut du contenu"});
        }
        else{
            const newReport = {
                nomRapport : req.body.nomRapport,
                dateParution : req.body.dateParution
            }
            const createdReport = await Report.create(newReport);
            await Report.createTreatement(req.body.idReleve, createdReport.insertId);
            const idStaff =(await Staff.getIdByMail(req.user.username))[0].idAgent;
            await Report.createRedation(idStaff, createdReport.insertId);
            res.json({message: "Rapport ajouté avec succès"});
        }
    }
    catch (error){
        next(error);
    }
}

async function orderReportByGasAndTime(req, res, next){
    try{
        const startDate = req.params.startDate == 'noDate' ? '1900-01-01' : req.params.startDate;
        const finishDate = req.params.finishDate == 'noDate' ? '2100-01-01' : req.params.finishDate;
        if(req.params.formuleGaz == 'all'){
            res.json(await Report.getInTime(startDate, finishDate));
        }
        else{
            res.json(await Report.orderByGazAndTime(req.params.formuleGaz, startDate, finishDate));
        }
    }
    catch (error){
        next(error);
    }
}

async function getAllYearOfReports(req, res, next){
    try{
        res.json(await Report.getAllYear());
    }
    catch (error){
        next(error);
    }
}


module.exports = {
    createReport,
    orderReportByGasAndTime,
    getAllYearOfReports
}