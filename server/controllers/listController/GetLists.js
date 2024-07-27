const Lists = require('../../models/ListDataModel');

const GetLists = async (req, res) => {
    const { userId, boardId } = req.body;

    if (!userId || !boardId) {
        return res.status(400).json({ error: 'Missing userId or boardId' });
      }

    try {
        const user = await Lists.findOne({ userId })

        if (user) {
            const board = user.lists.find((list) => list.boardId == boardId);
            if (board) {
                return res.status(200).json(board.list)
            }
            else {
                const addBoard = await Lists.findOneAndUpdate({ userId }, { $push: { lists: [{ boardId, list: [{ title: "To do" }, { title: "In progress" }, { title: "Done" }] }] } }, { new: true })
                return res.status(200).json(addBoard.lists.list)
            }
        }
        else {
            const create = await Lists.create(
                {
                    userId: userId,
                    lists: [
                        {
                            boardId: boardId,
                            list: [
                                { title: "To do" },
                                { title: "In progress" },
                                { title: "Done" },
                            ],
                        },
                    ],
                }
            );
            return res.status(200).json(create.lists[0].list);
        }

    } catch (error) {
        console.log(error)
        return res.status(400).json({ error: error.message })
    }

}

module.exports = { GetLists }