const Boards = require('../models/BoardModel')
const Lists = require('../models/ListDataModel')


const DeleteUserData = async (req, res) => {
    const { userId } = req.body

    try {
        const deletelists = await Lists.deleteOne({ userId })
        if (deletelists) {
            const deleteboards = await Boards.deleteOne({ userId });
            if (deleteboards) {
                res.status(200).json({ deleteboards })

            }
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = { DeleteUserData }