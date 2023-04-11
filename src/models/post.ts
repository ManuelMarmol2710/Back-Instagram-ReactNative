import { model, Schema, Document, now,} from "mongoose";

export interface post extends Document {
  posts: string;
  owner: string;
  url:string;
  disable: boolean;
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
    disable:{
      type: Boolean,
      require: true,
     },
    url:{
      type: String
    },
  
    url2:{
      type: String
    },
    url3:{
      type: String
    },
    url4:{
      type: String
    },
    url5:{
      type: String
    },
    url6:{
      type: String
    },
    url7:{
      type: String
    },
    url8:{
      type: String
    },
    url9:{
      type: String
    },
    url10:{
      type: String
    },
  },
  {
    versionKey: false,
  }
);
postSchema.pre<post>("save", async function (next) {});

export default model<post>("Post", postSchema);
