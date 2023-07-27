export default {
  name: "${self:service}-${self:provider.stage}-order-created-parallel-flow",
  events: [],
  definition: {
    Comment: "Order created flow (Parallel)",
    StartAt: "Communications",
    States: {
      Communications: {
        Type: "Parallel",
        Next: "Finalize",
        Branches: [
          {
            Comment: "Sending email using parallel flow",
            StartAt: "SendMail",
            States: {
              SendMail: {
                Type: "Task",
                Resource: "arn:aws:states:::lambda:invoke",
                Parameters: {
                  FunctionName:
                    "arn:aws:lambda:${self:provider.region}:${aws:accountId}:function:${self:service}-${self:provider.stage}-order-created-flow",
                  Payload: {
                    "order.$": "$",
                    action: "send-mail-with-parallel-flow",
                  },
                },
                End: true,
              },
            },
          },

          {
            Comment: "Sending whatsapp message using parallel flow",
            StartAt: "SendWhatsAppMessage",
            States: {
              SendWhatsAppMessage: {
                Type: "Task",
                Resource: "arn:aws:states:::lambda:invoke",
                Parameters: {
                  FunctionName:
                    "arn:aws:lambda:${self:provider.region}:${aws:accountId}:function:${self:service}-${self:provider.stage}-order-created-flow",
                  Payload: {
                    "order.$": "$",
                    action: "send-whats-app-message-with-parallel-flow",
                  },
                },
                End: true,
              },
            },
          },
        ],
      },

      Finalize: {
        Type: "Pass",
        End: true,
      },
    },
  },
};
