import { REGISTRATION } from "../../utils/constants";
import { myReduxActions } from "../util/actionCrud";

export const authActions = myReduxActions(
  REGISTRATION,
  "Registration",
  "auth/registration"
);
