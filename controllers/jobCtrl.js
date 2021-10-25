const { find } = require('../models/jobModel')
const Job = require('../models/jobModel')
const Company = require('../models/companyModel')

const jobCtrl = {
    createJob: async (req, res) => {
        const { companyName, position, level, jobType, industry, address, description, requirement, skill,
            minSalary, maxSalary, companySize, infoCompany, logo, image, benefit, startDate, endDate } = req.body
        if (!companyName || !position || !level || !jobType || !industry || !address || !description || !requirement || !skill
            || !minSalary || !maxSalary || !companySize || !infoCompany) {
            return res.json({ msg: 'Missing pramater' })
        }

        const newJob = new Job({
            idCompany: req.user._id, companyName, position, level, jobType, industry, address, description, requirement, skill,
            companySize, infoCompany, logo, image, benefit, minSalary, maxSalary, endDate
        })
        await newJob.save()
        return res.json({
            newJob: {
                ...newJob._doc,
                user: req.user
            },
            msg: 'Create successed'
        })
    },
    getAllJob: async (req, res) => {
        try {
            const jobs = await Job.find().sort('-createdAt')
            return res.json(jobs)
        } catch (err) {
            return res.json({ msg: err.message })
        }
    },
    getjobByType: async (req, res) => {
        try {
            const { jobType } = req.body
            const jobs = await Job.find({ jobType: jobType }).limit(7)
            return res.json(jobs)
        } catch (err) {
            return res.json({ msg: err.message })
        }
    },
    searchJob: async (req, res) => {
        try {
            const jobs = await Job.find({ position: { $regex: req.query.position } })
            res.json(jobs)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateJob: async (req, res) => {
        try {
            const { id, companyName, position, level, jobType, industry, address, description, requirement, skill,
                minSalary, maxSalary, companySize, infoCompany, logo, image, benefit, startDate, endDate } = req.body

            const newJob = await Job.findOneAndUpdate({ _id: id }, {
                companyName, position, level, jobType, industry, address, description, requirement, skill,
                minSalary, maxSalary, companySize, infoCompany, logo, image, benefit, startDate, endDate
            })
            return res.json({ newJob: { ...newJob._doc, user: req.user }, msg: 'update success' })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

module.exports = jobCtrl