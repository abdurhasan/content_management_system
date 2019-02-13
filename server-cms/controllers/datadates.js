const Datadate = require('../models/datadate');
const moment = require('moment')

module.exports = {
    getById: function (req, res, next) {
        
        Datadate.findById(req.params.datadateId, function (err, datadateInfo) {
            if (err) {
                console.log(err)
            } else {
                res.json({ status: "success", message: "Datadate found!!!", data: { Datadate: datadateInfo } });
            }
        });
    },
    search: function (req, res) {
        let keyword = {};
        if(req.query.letter){
          keyword.letter = req.query.letter
        }
        if(req.query.frequency){
          keyword.frequency = req.query.frequency
        }

        Datadate.find(keyword).then(datadate1 => {
          let data = [];
          datadate1.forEach(item=>{
            data.push({
              _id: item._id,
              letter: moment(item.letter).format("DD MMM YYYY"),
              frequency: item.frequency
            })
          })
          res.json(data);
        })
    },
    getAll: function (req, res, next) {
        let dataList = [];
        Datadate.find({}, function (err, Datadate) {

            if (err) {
                next(err);
            } else {
                for (let item of Datadate) {
                    dataList.push({ id: item._id, letter: moment(item.letter).format("DD MMM YYYY"), frequency: item.frequency });
                }
                res.json({ success: true,dataList});

            }
        });
    },
    updateById: function (req, res, next) {
        let id = req.params.datadateId
        Datadate.findByIdAndUpdate(id, {
            letter: req.body.letter,
            frequency: req.body.frequency
          }, (function (err, datadateInfo) {
            if (err)
                next(err);
            else {
                res.json({ status: "success", message: "Datadate updated successfully!!!", data: {
                    _id: datadateInfo._id,
                    letter: moment(datadateInfo.letter).format("DD MMM YYYY"),
                    frequency: datadateInfo.frequency
                  } });
            }
        }))
                
    },
    deleteById: function (req, res, next) {
        Datadate.findByIdAndRemove(req.params.datadateId, function (err, datadateInfo) {
            if (err)
                next(err);
            else {
                res.json({ status: "success", message: "Datadate deleted successfully!!!", data: null });
            }
        });
    },
    create: function (req, res, next) {        
        Datadate.create({ letter: req.body.letter, frequency: req.body.frequency}, function (err,result) {
            if (err)
                res.json(err)
            else
                res.json({ status: "success", message: "Datadate added successfully!!!",data:{
                    _id: result._id,
                    letter: moment(result.letter).format("DD MMM YYYY"),
                    frequency: result.frequency
                  }
            
            });

        });
        
    },
}