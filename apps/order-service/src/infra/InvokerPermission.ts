export class InvokerPermission {
  getRoles() {
    return {
      Effect: "Allow",
      Action: ["lambda:InvokeFunction"],
      Resource: ["*"],
    };
  }
}
