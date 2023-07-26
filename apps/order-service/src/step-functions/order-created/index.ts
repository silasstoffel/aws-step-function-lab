export default {
  name: "${self:service}-${self:provider.stage}-order-created",
  events: [],
  definition: {
    Comment: "Order created flow",
    StartAt: "SendMail",
    States: {
      SendMail: {
        Type: "Task",
        Resource: "arn:aws:states:::lambda:invoke",
        ResultSelector: {
          "event.$": "States.StringToJson($.Payload.body)",
        },
        Parameters: {
          FunctionName:
            "arn:aws:lambda:us-east-1:808056304349:function:${self:service}-${self:provider.stage}-order-created-flow",
          Payload: {
            "order.$": "$",
            action: "send-mail",
          },
        },
        Next: "SendWhatsAppMessage",
      },

      SendWhatsAppMessage: {
        Type: "Task",
        Resource: "arn:aws:states:::lambda:invoke",
        InputPath: "$.event",
        ResultPath: "$.sendWhatsAppMessageOutput",
        Parameters: {
          FunctionName:
            "arn:aws:lambda:us-east-1:808056304349:function:${self:service}-${self:provider.stage}-order-created-flow",
          Payload: {
            "order.$": "$.order",
            action: "send-whats-app-message",
            "previousStep.$": "$.reference",
          },
        },
        End: true,
      },
    },
  },
};
