import Elysia from "elysia";
import mongoose from "mongoose";

import { IDocument } from "@common/types/db";
export interface DData {
  id: string;
  no: number;
  name: string;
  tags: string[];
  cover: string;
  images: string[];
}
export type IData = IDocument<DData>;

const dataSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  no: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  cover: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
}, {
  timestamps: true,
});
export const DataDB = mongoose.model<IData>("Data", dataSchema);

const getData = async () => {
  const data = await DataDB.find({}).sort({ no: 1 }).exec();
  return data.map((item) => ({
    id: item.id,
    no: item.no,
    name: item.name,
    tags: item.tags,
    cover: item.cover,
    // images: item.images,
  }));
};

const getDataById = async (id: string): Promise<DData> => {
  const data = await DataDB.findOne({
    id,
  }).exec();
  if (!data) throw new Error("NOT_FOUNDED_KEY");
  return {
    id: data.id,
    no: data.no,
    name: data.name,
    tags: data.tags,
    cover: data.cover,
    images: data.images,
  };
};

const DataModel = new Elysia()
  .decorate("dataModel", {
    db: DataDB,
    getData,
    getDataById,
  });

export default DataModel;
