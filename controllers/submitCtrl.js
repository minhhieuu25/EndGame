const submit = require('../models/submitModel')


const submitCtrl = {
    submit: async (req, res) => {
        try {
            const { idJob, idCompany, idCV } = req.body
            if (!idJob || !idCV)
                return res.json({ msg: 'Missing parameter!' })


            const oldSubmit = await submit.findOne({ idJob })
            if (oldSubmit) {
                const arr = oldSubmit.cv.filter(element => element.idCV === idCV)
                if (!arr) {
                    await submit.findOneAndUpdate({ idJob }, { $push: { cv: { 'idCV': idCV } } })
                    return res.json({ msg: 'submit success!' })
                }
                else {
                    return res.json({ msg: 'Your CV has been submitted' })
                }
            }

            const newSubmit = new submit({ idJob, idCompany, cv: { 'idCV': idCV } })
            await newSubmit.save()
            return res.json({ newSubmit: { ...newSubmit._doc, user: req.user }, msg: 'submit success!' })

        } catch (err) {
            return res.json({ msg: err.message })
        }
    }
}

module.exports = submitCtrl