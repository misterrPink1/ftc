import dbConnect from "@/lib/dbConnect";
import Grant from "@/models/Grants";

export default async function handler(req, res) {
    const {
        query: { id },
        method,
    } = req;

    await dbConnect();

    switch (method) {
        case "GET": /* Get a model by its ID */
            try {
                const grant = await Grant.findById(id);
                if(!grant) {
                    return res.status(400).json({success: false});
                }
                res.status(200).json({success: true, data: grant});
            } catch (error) {
                res.status(400).json({success: false});
            }
            break;
        case "PUT": /* Edit a model by its ID */
            try {
                // Prepare the update object
                const update = {
                    $set: {
                    ...req.body,
                    },
                };
                const grant = await Grant.findByIdAndUpdate(id, update, {
                    new: true,
                    runValidators: true,
                    });
                if(!grant) {
                    return res.status(400).json({success: false});
                }
                res.status(200).json({success: true, data: grant});
            } catch (error) {
                res.status(400).json({success: false});
            }
            break;
        case "DELETE": /* Delete a model by its ID */
            try {
                const deleteGrant = await Grant.deleteOne({_id: id});
                if(!deleteGrant) {
                    return res.status(400).json({success: false});
                }
                res.status(200).json({success: true, data: {}});
            } catch (error) {
                res.status(400).json({success: false});
            }
            break;
        default:
            res.status(400).json({success: false});
            break;
    }
}