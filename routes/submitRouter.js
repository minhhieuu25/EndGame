const router = require('express').Router()
const auth = require("../middleware/auth")
const submitCtrl = require('../controllers/submitCtrl')

router.post('/submit-cv', auth, submitCtrl.submit)
router.get('/get_submited', auth, submitCtrl.getSubmited)

module.exports = router