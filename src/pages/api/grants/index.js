import dbConnect from "@/lib/dbConnect";
import Grant from "@/models/Grants";

export default async function handler(req, res) {
    const {method} = req;

    await dbConnect();

    switch (method) {
        case "GET":
            try {
                const grants = await Grant.find({
                    /* find all the data in our database */
                });
                res.status(200).json({success: true, data: grants});
            } catch (error) {
                res.status(400).json({success: false});
            }
            break;
        case "POST":
            try {
                const grant = await Grant.create(
                    /* create a new model in the database */
                    req.body
                );
                res.status(201).json({success: true, data: grant});
            } catch (error) {
                res.status(400).json({success: false});
            }
            break;
        default:
            res.status(400).json({success: false});
            break;
    }
}