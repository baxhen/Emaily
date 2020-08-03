import mongoose from 'mongoose';

const { Schema } = mongoose;

export const RecipientSchema = new Schema({
  email: String,
  responded: { type: Boolean, default: false },
});
