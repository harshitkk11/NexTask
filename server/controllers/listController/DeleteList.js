const Lists = require('../../models/ListDataModel')


const DeleteList = async (req, res) => {
    const { userId, boardId } = req.body

    try {
        const document = await Lists.findOne({ userId });
        document.lists.pull({ boardId: boardId });
        await document.save();
        return res.status(200).json(document)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = { DeleteList }