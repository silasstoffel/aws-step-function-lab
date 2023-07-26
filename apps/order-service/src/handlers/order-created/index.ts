import { handlerPath } from "../../../../../packages/serverless-util";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
};
