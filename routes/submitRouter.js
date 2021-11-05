const router = require('express').Router()
const auth = require("../middleware/auth")
const authCompany = require("../middleware/authCompany")
const submitCtrl = require('../controllers/submitCtrl')

router.post('/submit-cv', auth, submitCtrl.submit)
router.get('/get_submited', auth, submitCtrl.getSubmited)
router.post('/unsubmit_cv', auth, submitCtrl.unsubmit)
router.get('/get_submited_for_company', auth, authCompany, submitCtrl.getSubmitedForCompany)

module.exports = router