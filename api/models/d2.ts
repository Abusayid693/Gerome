import mongoose from 'mongoose';
import {d1Schema} from './d1';

export const d2 = mongoose.model('d2', d1Schema);
