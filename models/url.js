import mongoose from 'mongoose';

const urlSchema = mongoose.Schema({
  shortId: {
    type: String,
    required: true,
    unique: true,
  },
  redirectUrl: {
    type: String,
    required: true,
  },
  visitHistory: [
    {
      timeStamp: {
        type: Number,
      }
    }
  ],
  createdBy: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "users",
  }
},
{
  timestamps: true
});

const Url = mongoose.model('url', urlSchema);
export default Url;