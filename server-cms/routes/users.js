const { auth } = require('../middlewares/auth');
const userController = require('../controllers/users')
const router = require('express').Router();


/* GET home page. */
router.post('/register', userController.create);
router.post('/login', userController.signIn);
router.get('/data',auth, userController.getAll);
router.get('/logout',auth, userController.signOut);
router.get('/check',auth,userController.check)





module.exports = router;


