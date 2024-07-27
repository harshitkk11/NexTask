const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Lists = new Schema({
    userId: {
        type: String,
        required: true
    },
    lists: [{
        boardId: {
            type: String,
            required: true
        },
        list: [{
            title: {
                type: String,
                required: true,
            },
            tasks: [{
                title: {
                    type: String,
                    required: true,
                },
                description: {
                    type: String,
                }
            }]
        }]
    }]
})

module.exports = mongoose.model('list', Lists)