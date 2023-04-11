import { model, Schema, Document } from "mongoose";

export interface follow extends Document {
  following: string;
  owner: string;
  disable: boolean;
}

const followSchema = new Schema(
  {
    owner: {
        type: String,
        require: true,
      },
    following: {
      type: String,
      require: true,
    },
    disable:{
      type: Boolean,
      require: true,
     }
  
  },
  {
    versionKey: false,
  }
);
followSchema.pre<follow>("save", async function (next) {});

export default model<follow>("Follow", followSchema);
