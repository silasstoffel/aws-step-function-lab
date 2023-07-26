import { Context } from "aws-lambda";

interface OrderSchema {
  id: string;
  createdAt: Date;
  items: unknown[];
}

interface PreviousReference {
  action: string;
  occurredAt: Date;
  requestId: string;
}

interface EventSchema {
  action: string;
  order: OrderSchema;
  previousReference: PreviousReference;
}

export const main = async (event: EventSchema, context: Context) => {
  console.log("Event-Payload", JSON.stringify(event, null, 2));

  const reference = {
    action: event.action,
    occurredAt: new Date(),
    requestId: context.awsRequestId,
  };

  return {
    statusCode: 200,
    body: JSON.stringify({ order: event.order, reference }),
  };
};
