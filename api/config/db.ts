import mongoose from 'mongoose';

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

export const connectDB = async () => {
  // @ts-ignore
  await mongoose.connect('mongodb://localhost:27017/gerome', options);
  console.log('[Running]: Database successfully connected');
};
