import { model, Schema, Document, now,} from "mongoose";

export interface stories extends Document {
 owner: string;
  url:string;

}

const storiesSchema = new Schema(
  {
   
    url:{
        type: String,
        require: true,
      },

    owner: {
      type: Object,
      require: true,
    },

    time:{
      type: Date,
      default: Date.now(),
       require: true,
    },
    
  

  },
  {
    versionKey: false,
  }
);
storiesSchema.pre<stories>("save", async function (next) {});

export default model<stories>("Stories", storiesSchema);
