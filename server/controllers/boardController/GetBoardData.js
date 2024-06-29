const Boards = require('../../models/BoardModel');

const GetBoardData = async (req, res) => {
    const {username, boardtitle} = req.body
    console.log(username, boardtitle)

    try {
        const user = await Boards.findOne({username})
        const board = user.boarddata.find((board) => board.boardtitle == boardtitle);

        res.status(200).json(board)
    } catch(error) {
        res.status(400).json({error: error.message})
    }

}

module.exports = { GetBoardData }