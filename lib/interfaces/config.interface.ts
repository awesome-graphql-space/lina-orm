import { Agent } from "https";
import { AgentOptions } from "./agent-options.interface";

export interface ConfigOptions {
  database: string,
  url?: string | string[],
  host?: string,
  port?: string,
  username: string,
  password: string,
  isAbsolute?: boolean,
  protocol?: string,
  headers?: object,
  agentOptions?: AgentOptions,
  loadBalancingStrategy?: LoadBalancingStrategy
  arangoVersion?: string;
  agent?: Agent,
  maxRetries?: number | false;
}

enum LoadBalancingStrategy {
  NONE= 'NONE',
  ONE_RANDOM= 'ONE_RANDOM',
  ROUND_ROBIN= 'ROUND_ROBIN',
}