const mongoose = require('mongoose');
const Piani = mongoose.model('Piani');

//read all plans
module.exports.plansRead = (req, res) => {
    console.log("Request di tutti i Piani");
    Piani.find({}).exec(function(err, pianis){
        if(err) {
            console.log("Errore ricevimento piani");
        } else {
            res.status(200).json(pianis);
        }
    });
};

//read single plan
module.exports.planRead = (req, res) => {
    console.log("richiesta per un solo piano");
    Piani.findById(req.params.id).exec(function(err, piani){
        if(err) {
            console.log("errore ricevimento piano");
        } else {
            res.status(200).json(piani);
        }
    });
};