const {Schema} = require('mongoose')

const responseSchema = Schema({
    studID:String,
    question1:String,
    question2:String
})

module.exports = responseSchema