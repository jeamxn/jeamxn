import { ObjectId, type Document } from "mongoose";
export type IDocument<T> = Document<ObjectId, any, T> & T & {
  _id: any;
};

export interface Awards {
  icon: string;
  url: string;
  name: string;
  host: string;
  organizer: string;
  by: string;
  period: string;
  when: string;
}

export interface Projects {
  icon: string;
  cover: string;
  priority: number;
  url: string;
  data: {
    title: string;
    description: string;
    startDate: string;
    endDate: string;
  };
}

export interface Teams {
  priority: number;
  url: string;
  icon: string;
  name: string;
}