import { VoterModel } from "./voter.model";

export type AuthResponseModel = {
  access?: string;
  refresh?: string;
  email?: string;
};

export type AuthMergeResponseModel = {
  auth: AuthResponseModel;
  me: VoterModel;
};
