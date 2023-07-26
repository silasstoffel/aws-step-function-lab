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
    stateMachineArn:
      "arn:aws:states:us-east-1:808056304349:stateMachine:order-service-dev-order-created",
    input: data,
  };

  await stepFunction.startExecution(params).promise();

  return { statusCode: 200, body: data };
};
