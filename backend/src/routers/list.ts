import Elysia from "elysia";

import DataModel from "@back/models/data";
import { errorElysia } from "@back/utils/error";

const list = new Elysia().use(DataModel).get(
  "data",
  async ({ dataModel }) => {
    const data = await dataModel.getData();
    return data;
  },
  {
    response: {
      ...errorElysia(["NOT_FOUNDED_KEY"]),
    },
  },
);

export default list;
