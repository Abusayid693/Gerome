import * as Sentry from '@sentry/node';
import {NextFunction, Request, Response} from 'express';
import {Customers} from '../../models/Customers';
import {d1} from '../../models/d1';
import * as errorResponse from '../../utils/errorResponse';
import * as helpers from './helpers';

/**
 * @param body - limit, offset
 * @returns  - sends all customers for a admin
 */

export const getCustomers = async (req: Request, res: Response, next: NextFunction) => {
  const {limit = 50, offset = 0} = req.body;
  const adminId = req.user._id;
  console.log('I am getting hit');

  try {
    // [TODO]: optimize response by sending only required customer data
    const customers = await Customers.find({adminId}).skip(offset).limit(limit);

    res.status(201).json({
      success: true,
      data: {
        customers: [...customers],
        total: customers.length
      }
    });
  } catch (error) {
    Sentry.captureException(`Error occoured at ${__filename}.getCustomers: ${error}`);
    next(error);
  }
};

/**
 * @param req - id
 * @returns - customer details for given id
 */

export const getCustomerById = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  if (!id) {
    return next(new errorResponse.ErrorResponse('Required fields not provided', 400));
  }
  try {
    const customer = await Customers.findById(id);
    if (!customer) {
      throw new errorResponse.NotFoundResponse(`customer with id:${id} not found`);
    }
    res.status(201).json({
      success: true,
      data: {
        customer
      }
    });
  } catch (error) {
    Sentry.captureException(`Error occoured at ${__filename}.getCustomerById: ${error}`);
    next(error);
  }
};

/**
 * @param req - name, phone, email, refUser
 * @returns - add new customer in databse
 */

export const addNewCustomer = async (req: Request, res: Response, next: NextFunction) => {
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

    Sentry.captureException(`Error occoured at ${__filename}.addNewCustomer: ${error}`);
    return next(error);
  }
};

/**
 * @param req - name, phone, email, refUser
 * @returns - updates customer in databse
 */

export const updateExistingCustomer = async (req: Request, res: Response, next: NextFunction) => {
  const {name, email, refUser} = req.body;
  const id = req.params.id;
  if (!id) {
    return next(new errorResponse.ErrorResponse('Required fields not provided', 400));
  }

  try {
    const customer = await Customers.findById(id);
    if (!customer) {
      throw new errorResponse.NotFoundResponse(`customer with id:${id} not found`);
    }
    await customer?.update({
      name,
      email,
      refUser
    });

    const updatedCustomer = await Customers.findById(id);
    res.status(200).json({
      success: true,
      data: {
        customer: {...updatedCustomer?.toJSON()}
      }
    });
  } catch (error) {
    Sentry.captureException(`Error occoured at ${__filename}.updateExistingCustomer: ${error}`);
    next(error);
  }
};

export const aggregate = async (req: Request, res: Response, next: NextFunction) => {
  const adminId = req.user._id;

  try {
    const result = await Customers.aggregate([
      {$match: {adminId}},
      {$group: {_id: null, totalToTake: {$sum: '$totalToTake'}, totalToGive: {$sum: '$totalToGive'}}}
    ]);
    res.status(200).json({
      success: true,
      data: {
        totalToTake: result?.[0].totalToTake,
        totalToGive: result?.[0].totalToGive
      }
    });
  } catch (error) {
    Sentry.captureException(`Error occoured at ${__filename}.aggregate: ${error}`);
    return next(error);
  }
};

export const deleteExistingCustomer = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const adminId = req.user._id;

  if (!id) {
    return next(new errorResponse.ErrorResponse('Required fields not provided', 400));
  }

  try {
    const customer = await Customers.findById(id);
    if (!customer) {
      throw new errorResponse.NotFoundResponse(`customer with id:${id} not found`);
    }

    await d1.deleteMany({adminId, customerId: id});
    await customer.delete();

    res.status(200).json({
      success: true,
      data: 'Customer successfully deleted'
    });
  } catch (error) {
    Sentry.captureException(`Error occoured at ${__filename}.deleteExistingCustomer: ${error}`);
    next(error);
  }
};
