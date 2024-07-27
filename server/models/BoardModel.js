const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Boards = new Schema({
    userId: {
        type: String,
        required: true
    },
    boarddata: [{
        boardtitle: {
            type: String,
            required: true,
        },
        background: {
            type: String
        },
        id: {
            type:Schema.Types.ObjectId
        }
    }]
})

module.exports = mongoose.model('boards', Boards)