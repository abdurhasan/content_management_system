const Data = require('../models/data');


module.exports = {
    getById: function (req, res, next) {       
        let id = req.params.dataId || req.body.id
        Data.findById(id, function (err, dataInfo) {
            if (err) {
                next(err);
            } else {
                res.json({ status: "success", message: "Data found!!!", data: dataInfo });
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

        Data.find(keyword).then(data1 => {
          let data = [];
          data1.forEach(item=>{
            data.push({
              _id: item._id,
              letter: item.letter,
              frequency: item.frequency
            })
          })
          res.json(data);
        })
    },
    getAll: function (req, res, next) {
        let dataList = [];
        Data.find({}, function (err, Data) {

            if (err) {
                next(err);
            } else {
                for (let item of Data) {
                    dataList.push({ id: item._id, letter: item.letter, frequency: item.frequency });
                }
                res.json({ success: true,dataList  });

            }
        });
    },
    updateById: function (req, res, next) {
        let id = req.params.dataId || req.body.dataId
        Data.findByIdAndUpdate(id, {
            letter: req.body.letter,
            frequency: req.body.frequency
          }, (function (err, dataInfo) {
            if (err)
                next(err);
            else {
                res.json({ status: "success", message: "Data update successfully!!!", data: {
                    _id: dataInfo._id,
                    letter: req.body.letter,
                    frequency: req.body.frequency
                  } });
            }
        }))
      
    },
    deleteById: function (req, res, next) {
        Data.findByIdAndRemove(req.params.dataId, function (err, dataInfo) {
            if (err)
                next(err);
            else {
                res.json({ status: "success", message: "Data deleted successfully!!!", data: null });
            }
        });
    },
    create: function (req, res, next) {        
        Data.create({ letter: req.body.letter, frequency: req.body.frequency}, function (err,result) {
            if (err)
                res.json(err)
            else
                res.json({ status: "success", message: "Data added successfully!!!",data:{
                    _id: result._id,
                    letter: result.letter,
                    frequency: result.frequency
                  }
            
            });

        });
        
    },
}