import mongoose, { Schema } from 'mongoose';

export const D1 = 'totalToTake'
export const D2 = 'totalToGive'

export type D = typeof D1 | typeof D2

interface SchemaType {
  _id: string;
  /**
   * References for admin as user of the application
   */
  adminId: typeof Schema.Types.ObjectId;
  /**
   * References for customer of user
   */
  customerId: typeof Schema.Types.ObjectId;
  reason: string;
  details: string[];
  amount: string;
  type: D
}

export const d1Schema: Schema = new Schema<SchemaType>(
  {
    adminId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'adminId is required'],
      select: false
    },
    customerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'customerId is required'],
      select: false
    },
    reason: {
      type: String,
      required: [true, 'reason is required']
    },
    amount: {
      type: String,
      required: [true, 'amount is required']
    },
    details: {
      type: [String],
      default: []
    },
    type:{
      type: String,
      required: [true, 'type is required'],
      match: [
        /totalToTake|totalToGive/,
        'Please fill a valid type in d1Schema'
      ],
    },
    
  },
  {
    timestamps: true
  }
);

export const d1 = mongoose.model('d1', d1Schema);
