import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";

// GET (read)
export const GET = async (req, { params }) => {
    try {
        const { id } = params;
        await connectToDB();

        const prompt = await Prompt.findById(id).populate("creator");

        if (!prompt) {
            return new Response("Prompt not found!", { status: 404 })
        }

        return new Response(JSON.stringify(prompt), { status: 200 })
    } catch (err) {
        return new Response("Failed to fetch prompt!", { status: 500 });
    }
}
// PATCH (update)
export const PATCH = async (req, { params }) => {
    const { prompt, tag } = await req.json();
    const { id } = params;

    try {
        await connectToDB();

        const existingPrompt = await Prompt.findById(id)

        if (!existingPrompt) {
            return new Response("Not found any prompt!", { status: 404 });
        }
        // Update prompt!
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();
        return new Response(JSON.stringify(existingPrompt), { status: 200 });
    } catch (err) {
        console.log(err)
        return new Response("Failed to update prompt!", { status: 500 })
    }
}
// DELETE (DELETE IT)
export const DELETE = async (req, { params }) => {
    const { id } = params;

    try {
        await connectToDB();
        await Prompt.findByIdAndRemove(id);

        return new Response("Prompt deleted successfully!", { status: 200 })
    } catch (err) {
        return new Response("Failed to delete prompt!", { status: 500 })
    }
}