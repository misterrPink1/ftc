import dbConnect from "@/lib/dbConnect";
import User from "@/models/Users";

export default async function handler(req, res) {
    const {method} = req;

    await dbConnect();

    switch (method) {
        case "GET":
            try {
                const users = await User.find({
                    /* find all the data in our database */
                });
                res.status(200).json({success: true, data: users});
            } catch (error) {
                res.status(400).json({success: false});
            }
            break;
        case "POST":
            try {
                const user = await User.create(
                    /* create a new model in the database */
                    req.body
                );
                res.status(201).json({success: true, data: user});
            } catch (error) {
                res.status(400).json({success: false});
            }
            break;
        default:
            res.status(400).json({success: false});
            break;
    }
}