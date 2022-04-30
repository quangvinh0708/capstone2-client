import createSagaMiddleware from "redux-saga";
import mainSaga from "../Middlewares/Saga/mainSaga";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
// import { createBrowserHistory } from "history";
import {
    legacy_createStore as createStore,
    applyMiddleware,
    compose,
} from "redux";
import createRootReducer from "./Reducers/combineReducers";

// import mainSaga from "../Saga/mainSaga";
// import reducer from "../Reducers/combineReducer";

export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();

let composeEnhancers: any = null;

if (
    process.env.NODE_ENV !== "production" &&
    typeof window === "object" &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) {
    composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        actionSanitizer: (action) => {
            const message = action.payload && action.payload.message;
            return (action.type as string).endsWith("FAILURE")
                ? {
                      ...action,
                      payload: message,
                  }
                : action;
        },
    });
} else {
    composeEnhancers = compose;
}

const config = () => {
    const store = createStore(
        createRootReducer(history),
        composeEnhancers(
            applyMiddleware(
                routerMiddleware(history), // for dispatching history actions
                // ... other middlewares ...
                sagaMiddleware
            )
        )
    );
    sagaMiddleware.run(mainSaga);
    return store;
};

const store = config();
export type RootState = ReturnType<typeof store.getState>;

export default store;
