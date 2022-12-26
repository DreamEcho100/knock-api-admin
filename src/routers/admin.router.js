const express = require("express");

const router = express.Router();

const adminController = require('../controllers/admin.controller.js');
const { isAuth } = require('../middlewares/auth');


router.post('/', isAuth , adminController.addAdmin);

router.put('/:id' , isAuth , adminController.editAdmin)

router.get('/get-users', isAuth , adminController.getAdmins);
router.get('/:id', isAuth , adminController.getAdmin);

router.delete('/:id' , isAuth , adminController.removeAdmin)







module.exports = router;