const Boards = require('../../models/BoardModel');

const GetBoards = async (req, res) => {
    const {userId} = req.body

    try {
        const getboards = await Boards.findOne({userId})
        res.status(200).json(getboards)
    } catch(error) {
        res.status(400).json({error: error.message})
    }

}

module.exports = { GetBoards }