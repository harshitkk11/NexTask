const Lists = require('../../models/ListDataModel');


const UpdateList = async (req, res) => {
    const { userId, boardId, listData } = req.body;

    try {
        const update = await Lists.findOneAndUpdate({
            userId,
            lists: {
                $elemMatch: {
                    boardId: boardId
                }
            },
        }, {
            $set: {
                "lists.$.list": listData
            }
        })
        return res.status(200).json(update)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = { UpdateList }