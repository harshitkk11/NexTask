const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Boards = new Schema({
    username: {
        type: String,
        required: true
    },
    boarddata: [{
        boardtitle: {
            type: String,
            required: true,
            unique: true
        },
        background: {
            type: String
        },
        // lists: [],
        todo: [{
            title: {
                type: String
            },
            description : {
                type: String
            }
        }],
        inprogress: [{
            title: {
                type: String
            },
            description : {
                type: String
            }
        }],
        done: [{
            title: {
                type: String
            },
            description : {
                type: String
            }
        }]
    }]
})

module.exports = mongoose.model('boards', Boards)