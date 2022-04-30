import { useDispatch } from "react-redux";
import { PayloadAction } from "typesafe-actions";

export const REQUEST = "request";
export const SUCCESS = "success";
export const FAILURE = "failure";

interface DispatchActionParams {
    type: ActionType;
    payload: any;
    branch: any;
}

export type ActionType = "request" | "success" | "failure";

export const DispatchAction = (params: DispatchActionParams) => {
    const dispatch = useDispatch();
    const { type, payload, branch } = params;
    dispatch(branch[type](payload));
};
