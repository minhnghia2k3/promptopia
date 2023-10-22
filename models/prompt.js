import { Schema, model, models } from "mongoose"

const PromptSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    prompt: {
        type: String,
        required: [true, "Prompt field is required!"]
    },
    tag: {
        type: String,
        required: [true, "Tag field is required!"]
    }
})

const Prompt = models.Prompt || model('Prompt', PromptSchema)
export default Prompt