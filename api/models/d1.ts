import mongoose, {Schema} from 'mongoose';

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
}

const d1Schema: Schema = new Schema<SchemaType>(
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
    }
  },
  {
    timestamps: true
  }
);

export const d1 = mongoose.model('d1', d1Schema);
