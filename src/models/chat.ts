import { model, Schema, Document } from "mongoose";

export interface chat extends Document {
  text: string;
  username: string;
 user: Object;
  createdAt:string
  chating:string;
}

const chatSchema = new Schema(
  {
    text: {
        type: String,
        require: true,
      },
    username: {
      type: Object,
      require: true,
    },
    chating: {
        type: Object,
        require: true,
      },
   user: {
        type: Object,
        require: true,
      },
      createdAt: {
        type: String,
        require: true,
      }

  
  },
  {
    versionKey: false,
  }
);
chatSchema.pre<chat>("save", async function (next) {});

export default model<chat>("Chat", chatSchema);
