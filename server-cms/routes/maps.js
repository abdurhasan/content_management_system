const express = require('express');
const router = express.Router();
const mapsController = require('../controllers/maps');
const { auth } = require('../middlewares/auth');

router.get('/', mapsController.getAll);
router.post('/',auth, mapsController.create);
router.post('/search', mapsController.search);
router.get('/:mapsId', mapsController.getById);
router.put('/:mapsId',auth, mapsController.updateById);
router.delete('/:mapsId',auth, mapsController.deleteById);

module.exports = router;