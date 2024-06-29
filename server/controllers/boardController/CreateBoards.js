const Boards = require('../../models/BoardModel');


const CreateBoard = async (req, res) => {
    const { username, boardtitle, background } = req.body;
    const newboard = { boardtitle: boardtitle, background: background }

    try {
        const user = await Boards.findOne({ username })

        if (user) {
            const board = user.boarddata.find((board) => board.boardtitle == boardtitle);

            if (!board) {
                const create = await Boards.findOneAndUpdate({ username }, { $push: { boarddata: newboard } })
                return res.status(200).json(create)
            }
            return res.status(200).json({ error: "Board title already exist" })
        }
        else {
            const createnew = await Boards.create({ username, boarddata: [newboard] })
            return res.status(200).json(createnew)
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = { CreateBoard }