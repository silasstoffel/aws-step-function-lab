import type { AWS } from "@serverless/typescript";
import functions from "./src/handlers";
import stepFunctions from "./src/step-functions";
import serverlessSidecar from "../../packages/serverless-sidecar";
import { InvokerPermission } from "./src/infra/InvokerPermission";
import { StepFunctionPermission } from "./src/infra/StepFunctionPermission";

const invokerPermission = new InvokerPermission();
const stepFunctionPermission = new StepFunctionPermission();

interface ServerlessConfig extends AWS {
  stepFunctions: {
    stateMachines: unknown;
  };
}

const slsConfig: ServerlessConfig = {
  service: "order-service",
  provider: {
    name: "aws",
    memorySize: 128,
    iam: {
      role: {
        statements: [
          invokerPermission.getRoles(),
          stepFunctionPermission.getRoles(),
        ],
      },
    },
  },
  functions,
  stepFunctions: {
    stateMachines: {
      ...stepFunctions,
    },
  },
};

module.exports = serverlessSidecar(slsConfig);
