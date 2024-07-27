const Boards = require('../../models/BoardModel');


const UpdateBoard = async (req, res) => {
    console.log(req.body)
    const { userId, boardId, boardTitle, background } = req.body;
    const newboard = { boardtitle: boardTitle, background: background }
    
    try {
        const update = await Boards.findOneAndUpdate({
            userId,
            boarddata: {
                $elemMatch: {
                    _id: boardId
                }
            },
        }, {
            $set: {
                "boarddata.$.boardtitle": boardTitle,
                "boarddata.$.background": background
            }
        })
        return res.status(200).json(update)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = { UpdateBoard }