import * as mongoose from 'mongoose';

export const collaborativeChatSchema = new mongoose.Schema(
    {
        name:  {type: String, required: false },
        content: {type: String, required: false },
        chat:  {type: String, required: false },
        room:  {type: String, required: false },
    },
    {
        timestamps: true,
    },
);

