const Lists = require('../../models/ListDataModel');

const CreateList = async (req, res) => {
    const { userId, boardId, listTitle } = req.body

    try {
        const addList = await Lists.findOneAndUpdate({
            userId,
            lists: {
                $elemMatch: {
                    boardId: boardId
                }
            }
        }, {
            $push: {
                "lists.$.list": [{ title: listTitle, tasks: [] }]
            }
        }, { new: true })
        return res.status(200).json(addList)

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = { CreateList }