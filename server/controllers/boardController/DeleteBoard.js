const Boards = require('../../models/BoardModel')


const DeleteBoard = async (req, res) => {
    const { userId, boardId } = req.body

    try {
        const document = await Boards.findOne({ userId });
        document.boarddata.pull({ _id: boardId });
        await document.save();
        return res.status(200).json(document)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = { DeleteBoard }