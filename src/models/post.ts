import { model, Schema, Document, now,} from "mongoose";

export interface post extends Document {
  posts: string;
  owner: string;
  url:string;

}

const postSchema = new Schema(
  {
   
    post: {
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
    url:{
      type: String
    }
  
  
  },
  {
    versionKey: false,
  }
);
postSchema.pre<post>("save", async function (next) {});

export default model<post>("Post", postSchema);
