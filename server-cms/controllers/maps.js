const Maps = require('../models/maps');


module.exports = {
    getById: function (req, res, next) {
        console.log(req.body);
        Maps.findById(req.params.mapsId, function (err, mapsInfo) {
            if (err) {
                next(err);
            } else {
                res.json({ status: "success", message: mapsInfo== null ? 'Maps not found':'Maps founded', data: { maps: mapsInfo } });
            }
        });
    },
    search: function (req, res) {
        let keyword = {};
        if (req.query.title) {
            keyword.title = req.query.title
        }
        if (req.query.lat) {
            keyword.lat = req.query.lat
        }
        if (req.query.lng) {
            keyword.lng = req.query.lng
        }

        Maps.find(keyword).then(maps1 => {
            res.json(maps1);
        })
    },
    getAll: function (req, res, next) {
        let mapsList = [];
        Maps.find({}, function (err, maps) {

            if (err) {
                next(err);
            } else {
                for (let item of maps) {
                    mapsList.push({ id: item._id, title: item.title, lat: item.lat,lng: item.lng });
                }
                res.json({ success: true,mapsList });

            }
        });
    },
    updateById: function (req, res, next) {
        let id =req.params.mapsId
        Maps.findByIdAndUpdate(id, { title: req.body.title,lat:req.body.lat,lng:req.body.lng }, function (err, mapsInfo) {
            if (err)
                next(err);
            else {
                res.json({ status: "success", message: "Maps updated successfully!!!", data: req.body  });
            }
        });
    },
    deleteById: function (req, res, next) {
        let id = req.params.mapsId || req.body.mapsId
        Maps.findByIdAndRemove(id, function (err, mapsInfo) {
            if (err)
                next(err);
            else {
                res.json({ success: true, message: "Maps deleted successfully!!!", data: mapsInfo });
            }
        });
        
    },
    create: function (req, res, next) {
        Maps.create({ title: req.body.title, lat: req.body.lat, lng: req.body.lng }, function (err, result) {
            if (err)
                next(err);
            else
                res.json({ status: "success", message: "Maps added successfully!!!", data: result });

        });
        
    }
}