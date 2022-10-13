import {NextFunction, Request, Response} from 'express';
import {Customers} from '../../models/Customers';
import * as helpers from './helpers';

export const getCustomers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {limit = 50, offset = 0} = req.body;
  const adminId = req.user._id;

  try {
    const customers = await Customers.find({adminId}).skip(offset).limit(limit);
    const total = await Customers.find({adminId}).count();

    res.status(201).json({
      success: true,
      data: {
        customers: [...customers],
        total
      }
    });
  } catch (error) {}
};

export const addNewCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {name, phone, email, refUser} = req.body;
  const adminId = req.user._id;
  try {
    const customer = await Customers.create({
      adminId,
      name,
      phone,
      email,
      refUser
    });

    res.status(201).json({
      success: true,
      data: {
        customer: {...customer.toJSON()}
      }
    });
  } catch (error) {
    if (helpers.checkIfCustomerExists(error)) {
      res.status(409).json({
        success: false,
        errors: [
          {
            field: 'name',
            message: 'Customer already exists'
          }
        ]
      });
    }

    next(error);
  }
};

export const updateExistingCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {id, name, phone, email} = req.body;

  if (!id) {
    res.status(409).json({
      success: false,
      errors: [
        {
          field: 'id',
          message: 'id is required'
        }
      ]
    });
  }

  try {
    const customer = await Customers.findOne({_id: id});
    const isReferencedUserPresent = customer?.ifReferencedUserPresent();
    const refUser = isReferencedUserPresent
      ? await helpers.getReferencedUserByEmail(email)
      : null;

    await customer?.update({
      name,
      phone,
      email,
      refUser
    });

    const updatedCustomer = await Customers.findOne({_id: id});
    res.status(200).json({
      success: true,
      data: {
        customer: {...updatedCustomer?.toJSON()}
      }
    });
  } catch (error) {
    next(error);
  }
};

export const deleteExistingCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {id} = req.body;

  if (!id) {
    res.status(409).json({
      success: false,
      errors: [
        {
          field: 'id',
          message: 'id is required'
        }
      ]
    });
  }

  try {
    await Customers.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      data: 'Customer successfully deleted'
    });
  } catch (error) {
    next(error);
  }
};
