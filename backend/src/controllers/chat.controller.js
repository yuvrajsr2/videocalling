import { generateStreamToken } from "../lib/stream.js";

export async function getStreamToken(req, res) {
    try {
        const token = await generateStreamToken(req.user.id);
        res.status(200).json({ token });
    } catch (error) {
        console.error("Error in get stream token controller:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}