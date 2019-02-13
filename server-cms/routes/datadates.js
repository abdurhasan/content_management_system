const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/auth');
const datadateController = require('../controllers/datadates');

router.get('/search',auth, datadateController.search);
router.get('/', datadateController.getAll);
router.get('/:datadateId', datadateController.getById);
router.post('/',auth, datadateController.create);
router.put('/:datadateId',auth, datadateController.updateById);
router.delete('/:datadateId',auth, datadateController.deleteById);

module.exports = router;