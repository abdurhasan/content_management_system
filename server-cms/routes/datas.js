const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/auth');
const dataController = require('../controllers/data');

router.get('/search',auth, dataController.search);
router.get('/', dataController.getAll);
router.get('/:dataId',auth, dataController.getById);
router.post('/',auth, dataController.create);
router.put('/:dataId',auth, dataController.updateById);
router.delete('/:dataId',auth, dataController.deleteById);

module.exports = router;