export class StepFunctionPermission {
  getRoles() {
    return {
      Effect: "Allow",
      Action: ["states:StartExecution", "states:StartSyncExecution"],
      Resource: [
        "arn:aws:states:${self:provider.region}:${aws:accountId}:stateMachine:${self:service}-${self:provider.stage}-order-created",
      ],
    };
  }
}
