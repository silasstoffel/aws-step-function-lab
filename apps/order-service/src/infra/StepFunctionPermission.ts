export class StepFunctionPermission {
  public readonly orderCreatedArn =
    "arn:aws:states:${self:provider.region}:${aws:accountId}:stateMachine:${self:service}-${self:provider.stage}-order-created";
  public readonly orderCreatedParallelFlowArn =
    "arn:aws:states:${self:provider.region}:${aws:accountId}:stateMachine:${self:service}-${self:provider.stage}-order-created-parallel-flow";

  getRoles() {
    return {
      Effect: "Allow",
      Action: ["states:StartExecution", "states:StartSyncExecution"],
      Resource: [this.orderCreatedArn, this.orderCreatedParallelFlowArn],
    };
  }
}
