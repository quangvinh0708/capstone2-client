import { connectRouter, RouterState } from "connected-react-router";
import { combineReducers } from "redux";
import appReducer, { AppState } from "../../Features/App/reducer";
import facetTreeReducer, {
    FacetTreeState,
} from "../../Features/FacetTree/reducer";
import keywordTreeReducer, {
    KeywordTreeState,
} from "../../Features/KeywordTree/reducer";
import mainTreeHandleReducer, {
    MainTreeHandleState,
} from "../../Features/MainTreeHandle/reducer";

export interface IRootState {
    app: AppState;
    router: RouterState;
    facetTree: FacetTreeState;
    keywordTree: KeywordTreeState;
    mainTreeHandle: MainTreeHandleState;
}

const createRootReducer = (history: any) =>
    combineReducers<IRootState>({
        router: connectRouter(history),
        app: appReducer(),
        facetTree: facetTreeReducer(),
        keywordTree: keywordTreeReducer(),
        mainTreeHandle: mainTreeHandleReducer(),
    });
export default createRootReducer;
