import * as mongoose from 'mongoose';

export const CashFlowSchema = new mongoose.Schema(
  {
    name: { type: String, required: false }, // nombre extendido del proyecto
  },
  { timestamps: true },
);
