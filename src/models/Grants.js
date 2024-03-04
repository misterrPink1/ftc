import mongoose from "mongoose"


const GrantSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: [true, "Name is required"],
    },
    link: {
        type: String,
        required: [true, "Link is required"],
    },
    Category: {
        type: String,
        required: [true, "Category is required"],
    },
    "Min $ Award": {
        type: String,
        required: false,
    },
    "Max $ Award": {
        type: String,
        required: false,
    },
    Requirements: {
        type: String,
        required: false,
    },
    Industry: {
        type: String,
        required: false,
    },
    Description: {
        type: String,
        required: false,
    },
    Location: {
        type: String,
        required: false,
    },
    "For whom?": {
        type: String,
        required: false,
    },
    Deadline: {
        type: String,
        required: false,
    },
    'Additional Info': {
        type: String,
        required: false,
    },
    Submission: {
        type: String,
        required: false,
    }
})

export default mongoose.models.Grant || mongoose.model("Grant", GrantSchema)
