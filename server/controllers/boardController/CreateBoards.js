const Boards = require('../../models/BoardModel');


const CreateBoard = async (req, res) => {
    const { userId, boardtitle, background } = req.body;
    const newboard = { boardtitle: boardtitle, background: background }

    try {
        const user = await Boards.findOne({ userId })

        if (user) {
            const create = await Boards.findOneAndUpdate({ userId }, { $push: { boarddata: newboard } }, { new: true })
            return res.status(200).json(create)
        }

        else {
            const createnew = await Boards.create({ userId, boarddata: [newboard] })
            await createnew.save()
            return res.status(200).json(createnew)
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = { CreateBoard }