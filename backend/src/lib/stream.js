import {StreamChat} from "stream-chat";
import "dotenv/config";

const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;

if (!api_key || !api_secret) {
    console.error("STREAM_API_KEY and STREAM_API_SECRET must be set");
}


const client = StreamChat.getInstance(api_key, api_secret);

export const upsertStreamUser = async (user) =>{
    try {
        await client.upsertUsers([user]);
        return user;
    } catch (error) {
        console.log("error creatiing * userpting stream user", error);
        
    }
}


// todo : create a stream token for the users
export const generateStreamToken = (id) => {

};