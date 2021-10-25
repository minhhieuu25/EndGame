const mongoose = require('mongoose')


const companySchema = new mongoose.Schema({
    idCompany: {
        type: mongoose.Schema.ObjectId,
        required: true,
        unique: true
    },
    companyName: {
        type: String,
        default: ''
    },
    address: {
        type: String,
        default: ''
    },
    industry: {
        type: String,
        default: ''
    },
    info: {
        type: String,
        default: ''
    },
    companySize: {
        type: String,
        default: ''
    },
    logo: {
        type: String,
        default: ''
    },
    images: {
        type: String,
        default: ''
    },
    fax: {
        type: Number,
        default: ''
    },
    website: {
        type: String,
        default: ''
    },
    phoneNumber: {
        type: Number,
        default: 0
    },
    // followers: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
    // website: { type: String, default: '' },
    // followers: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
    // following: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
    // saved: [{ type: mongoose.Types.ObjectId, ref: 'user' }]
}, {
    timestamps: true
})


module.exports = mongoose.model('company', companySchema)