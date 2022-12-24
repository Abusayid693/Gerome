import * as Sentry from '@sentry/node';
import {NextFunction, Request, Response} from 'express';
import {Customers} from '../../models/Customers';
import {d1, D1, D2} from '../../models/d1';
import * as errorResponse from '../../utils/errorResponse';

export class d {
  async create(req: Request, res: Response, next: NextFunction) {
    const adminId = req.user._id;
    const {
      customerId,
      reason,
      details,
      amount,
      /**
       *
       */
      type
    } = req.body;

    if (type !== D2 && type !== D1) {
      return next(new errorResponse.ErrorResponse(`Required field type: ${type} invalid`, 400));
    }

    try {
      const result = await d1.create({
        adminId,
        customerId,
        reason,
        details,
        amount,
        type
      });

      const customer = await Customers.findById(customerId);
      if (!customer) {
        throw new errorResponse.NotFoundResponse(`customer with id:${customerId} not found`);
      }

      await customer.update({$inc: {[type]: amount}});

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
  }

  async get(req: Request, res: Response, next: NextFunction) {
    const adminId = req.user._id;
    const customerId = req.params.customerId;
    const {type, offset, limit} = req.body;

    if (type !== D2 && type !== D1) {
      return next(new errorResponse.ErrorResponse(`Required field type: ${type} invalid`, 400));
    }

    if (!customerId) {
      return next(new errorResponse.ErrorResponse('Required fields not provided', 400));
    }

    try {
      const result = await d1
        .find({adminId, customerId, type})
        .skip(offset * limit)
        .limit(limit);
      res.status(200).json({
        success: true,
        data: {
          result: [...result]
        }
      });
    } catch (error) {
      Sentry.captureException(`Error occoured at ${__filename}.get: ${error}`);
      return next(error);
    }
  }

  async recent(req: Request, res: Response, next: NextFunction) {
    const adminId = req.user._id;
    const customerId = req.params.customerId;
    const {offset = 0, limit = 10} = req.body;

    if (!customerId) {
      return next(new errorResponse.ErrorResponse('Required fields not provided', 400));
    }

    try {
      const result = await d1
        .find({adminId, customerId})
        .skip(offset * limit)
        .limit(limit);
      res.status(200).json({
        success: true,
        data: {
          result: [...result]
        }
      });
    } catch (error) {
      Sentry.captureException(`Error occoured at ${__filename}.get: ${error}`);
      return next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;

    if (!id) return next(new errorResponse.ErrorResponse('Required fields not provided', 400));

    try {
      const result = await d1.findById(id);
      if (!result) throw new errorResponse.NotFoundResponse(`data with id:${id} not found`);
      await result.delete();
      res.status(200).json({
        success: true,
        data: 'successfully deleted'
      });
    } catch (error) {
      Sentry.captureException(`Error occoured at ${__filename}.delete: ${error}`);
      return next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const {reason, details, amount} = req.body;
    const id = req.params.id;

    if (!id) return next(new errorResponse.ErrorResponse('Required fields not provided', 400));

    try {
      const result = await d1.findById(id);
      if (!result) {
        throw new errorResponse.NotFoundResponse(`data with id:${id} not found`);
      }
      await result.update({
        reason,
        details,
        amount
      });
      res.status(200).json({
        success: true,
        data: 'successfully updated'
      });
    } catch (error) {
      Sentry.captureException(`Error occoured at ${__filename}.update: ${error}`);
      return next(error);
    }
  }
}
