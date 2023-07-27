import { APIGatewayEvent } from "aws-lambda";
import { StepFunctions } from "aws-sdk";
import { ulid } from "ulid";

const stepFunction = new StepFunctions();

export const main = async (event: APIGatewayEvent) => {
  const quantity = Number((Math.random() * 10).toFixed(0));
  const price = quantity * Number((Math.random() * 10).toFixed(2));

  const order = {
    id: ulid(),
    createdAt: new Date(),
    items: [
      {
        productId: ulid(),
        productName: `Product ${ulid()}`,
        quantity,
        price,
        total: quantity * price,
      },
    ],
  };

  const data = JSON.stringify(order);

  const params = {
    stateMachineArn: process.env.CREATED_ORDER_SF_ARN as string,
    input: data,
  };

  const promises = [
    stepFunction.startExecution(params).promise(),
    stepFunction
      .startExecution({
        ...params,
        stateMachineArn: process.env.CREATED_ORDER_PARALLEL_SF_ARN as string,
      })
      .promise(),
  ];

  await Promise.all(promises);

  return { statusCode: 200, body: data };
};
