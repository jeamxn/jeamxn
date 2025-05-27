import Elysia from "elysia";

import each from "./each";
import list from "./list";
import update from "./update";

const IndexRouter = new Elysia({
  name: "Index",
  prefix: "",
})
  .use(list)
  .use(each)
  .use(update);

export default IndexRouter;
