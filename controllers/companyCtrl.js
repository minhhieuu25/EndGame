const Company = require('../models/companyModel')
const Users = require('../models/userModel')
const Job = require('../models/jobModel')

const companyCtrl = {
    getInfoCompany: async (req, res) => {
        try {
            const company = await Company.find({ idCompany: req.user._id })
            return res.json(company)
        } catch (err) {
            return res.json({ msg: err.message })
        }
    },
    getAllCompany: async (req, res) => {
        try {
            const companies = await Company.find()
            return res.json(companies)
        } catch (err) {
            return res.json({ msg: err.message })
        }
    },
    getCompanyByIndustry: async (req, res) => {
        try {
            const { industry } = req.body
            console.log(req)
            const company = await Company.find({ industry: industry })
            return res.json(company)
        } catch (err) {
            return res.json({ msg: err.message })
        }
    },
    updateInfoCompany: async (req, res) => {
        try {
            const { companyName, address, info, companySize, logo, email, website, phoneNumber } = req.body

            await Company.findOneAndUpdate({ idCompany: req.user.id }, {
                companyName, address, info, companySize, logo, website, phoneNumber, email
            })
            res.json({ msg: "Update Success!" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getInfomationCompany: async (req, res) => {
        try {
            const { id } = req.params.id
            const company = await Company.findOne({ companyId: id })
            return res.status(500).json(company)

        } catch (err) {
            return res.status(200).json({ msg: err.message })
        }

    },
    deleteCompany: async (req, res) => {
        const { idCompany } = req.body.data

        try {
            await Company.findOneAndDelete({ idCompany: idCompany })
            await Users.findOneAndUpdate({ _id: idCompany }, { role: 'candidate' })
            return res.json({ msg: 'Delete successfull' })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getTopCompany: (req, res) => {
        
    }
}

module.exports = companyCtrl