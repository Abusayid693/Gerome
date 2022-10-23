import * as Sentry from '@sentry/node';
import {NextFunction, Request, Response} from 'express';
import mongoose from 'mongoose';
import {Customers} from '../../models/Customers';
import * as errorResponse from '../../utils/errorResponse';

export class d {
  public _schema;
  public _typeToTake;

  constructor(public schema: typeof mongoose.Model, public typeToTake: string) {
    this._schema = schema;
    this._typeToTake = typeToTake;
  }

  async create(req: Request, res: Response, next: NextFunction) {
    const adminId = req.user._id;
    const {customerId, reason, details, amount} = req.body;

    try {
      const result = await this._schema.create({
        adminId,
        customerId,
        reason,
        details,
        amount
      });

      const customer = await Customers.findById(customerId);
      if (!customer) {
        throw new errorResponse.NotFoundResponse(`customer with id:${customerId} not found`);
      }

      await customer.update({$inc: {[this._typeToTake]: amount}});

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

    if (!customerId) {
      return next(new errorResponse.ErrorResponse('Required fields not provided', 400));
    }

    try {
      const result = await this._schema.find({adminId, customerId});
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
      const result = await this._schema.findById(id);
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
      const result = await this._schema.findById(id);
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
