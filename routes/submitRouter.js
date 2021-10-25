const router = require('express').Router()
const auth = require("../middleware/auth")
const submitCtrl = require('../controllers/submitCtrl')

router.post('/submit-cv', auth, submitCtrl.submit)


module.exports = router