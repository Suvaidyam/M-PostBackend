const History = require('../../Model/History');
module.exports = {
    getHistory: async (req, res) => {
        try {
            // workspace_id is provide by user in params => (http://localhost:4000/history/63f44e0acb7605df19646365)
            let { workspace_id } = req.params;
            if (!workspace_id) {
                return res.status(200).json({ message: "workspace_id is required" });
            } else {
                let history = await History.aggregate([{
                    $match: { workspace_id: workspace_id }
                },
                {
                    $project: {
                        _id: 0, data: {
                            "_id": "$_id",
                            "created_At": {
                                $dateToString: {
                                    format: "%H:%M:%S",
                                    date: "$created_At",
                                    timezone: "Asia/Kolkata"
                                }
                            }, "details": {
                                "url": "$details.url",
                                "method": "$details.method"
                            }
                        }, "date": {
                            $dateToString:
                            {
                                format: "%Y-%m-%d",
                                date: "$created_At"
                            }
                        }
                    }
                },
                {
                    $group: {
                        _id: "$date", data: {
                            $push: "$data"
                        }
                    }
                },
                {
                    $sort: { _id: -1 }
                }
                ]);
                return res.status(200).json({ message: "history List", history: history });
            }
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    postHistory: async (req, res) => {
        try {
            // workspace_id , url and method is provide by user in body
            let created_by = req.decoded._id
            let { workspace_id, details, request_id } = req.body;
            if (!workspace_id || !details) {
                return res.status(200).json({ message: "workspace_id , details is required" });
            } else {
                let history = await History.create({ workspace_id, details, created_by, request_id });
                return res.status(200).json({ message: "History Created Successfully", history: history });
            }
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    deleteHistory: async (req, res) => {
        try {
            // history_Id  is provide by user in params
            let history = await History.deleteOne(req.params);
            return res.status(200).json({ message: "History deleted Successfully", history: history });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}