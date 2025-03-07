import moongoose from "mongoose";
export const connectDb = async () => {
    try {
        const conn = await moongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(`MongoDb Connection error: ${error}`);

    }
}