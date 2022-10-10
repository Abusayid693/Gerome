import mongoose, {Model, Schema} from 'mongoose';

interface ICustomer {
  _id?: string;
  adminId: typeof Schema.Types.ObjectId;
  name: string;
  phone?: string;
  email?: string;
  /**
   * References for customer as user of
   * our application
   */
  refUser?: string;
  totalToTake: number;
  totalToGive: number;
}

const CustomersSchema: Schema = new Schema<ICustomer>({
  adminId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'userId is required']
  },

  name: {
    type: String,
    required: [true, 'name is required']
  },
  email: {
    type: String,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please fill a valid email address'
    ],
    default: null
  },
  phone: {
    type: String,
    default: null
  },
  refUser: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },

  totalToTake: {
    type: Number,
    default: 0
  },

  totalToGive: {
    type: Number,
    default: 0
  }
});

CustomersSchema.index({userId: 1, name: 1}, {unique: true});

CustomersSchema.methods.ifReferencedUserPresent = async function () {
  return (await this?.refUser) !== null;
};

export const Customers = mongoose.model('Customers', CustomersSchema);
