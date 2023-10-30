import { connectToDB } from "@/utils/database";
import Prompt from '@/models/prompt'


// Get prompts of specific userId
export const GET = async (req, { params }) => {
    try {
        // Connect to DB
        await connectToDB();
        // Find field in mongodb
        const prompts = await Prompt.find({
            creator: params.id
        }).populate('creator');

        // Return response with 200
        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (err) {
        // return response with 500 if false
        return new Response("Failed to get prompt by user id", { status: 200 })
    }
}