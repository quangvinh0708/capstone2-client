import { createAsyncAction } from "typesafe-actions";

export const app = createAsyncAction(
    "app/APP_REQUEST",
    "app/APP_SUCCESS",
    "app/APP_FAILURE"
)<any, any, Error>();
