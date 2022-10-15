import * as Sentry from '@sentry/node';
import {NextFunction, Request, Response} from 'express';
import {Customers} from '../../models/Customers';
import {d1} from '../../models/d1';

/**
 *
 */
export const create = async (req: Request, res: Response, next: NextFunction) => {
  const adminId = req.user._id;
  const {customerId, reason, details, amount} = req.body;

  try {
    const result = await d1.create({
      adminId,
      customerId,
      reason,
      details,
      amount
    });

    await Customers.findById(customerId).update({$inc: {totalToTake: amount}});

    res.status(200).json({
      success: true,
      data: {
        result: {...result?.toJSON()}
      }
    });
  } catch (error) {
    Sentry.captureException(`Error occoured at ${__filename}.create: ${error}`);
    return next(error);
  }
};
