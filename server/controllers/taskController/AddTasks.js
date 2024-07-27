const Lists = require('../../models/ListDataModel');

const AddTasks = async (req, res) => {
    const { userId, boardId, newList } = req.body
    console.log(userId, boardId, newList)
    // const card = {title: title, description: description}

    try {
        const addTask = await Lists.findOneAndUpdate({
            userId,
            lists: {
                $elemMatch: {
                    boardId: boardId
                }
            },
        }, {
            $set: {
                "lists.$.list": newList
            }
        }, { new: true })
        console.log(addTask)
        return res.status(200).json(addTask)

    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
}

module.exports = { AddTasks }