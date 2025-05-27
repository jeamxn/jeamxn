import Elysia from "elysia";

import DataModel from "@back/models/data";
import { errorElysia } from "@back/utils/error";

const each = new Elysia().use(DataModel).get(
  "data/:id",
  async ({ dataModel, params: { id } }) => {
    const data = dataModel.getDataById(id);
    return data;
  },
  {
    response: {
      ...errorElysia(["NOT_FOUNDED_KEY"]),
    },
  },
);

export default each;
