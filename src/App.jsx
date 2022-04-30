import React, { useRef, useState } from "react";
// import { BrowserRouter as Router, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { app } from "./Redux/Features/App/actions";
import Board from "./View/Components/Board.tsx/Board";
import Card from "./View/Components/Card/Card";
// import { RootState } from "./Redux/Store/store";
import "./App.css";
import Draggable from "react-draggable";
import { DndProvider } from "react-dnd";
import DragDrop from "./View/Components/DragDrop.jsx/DragDrop";
import { HTML5Backend } from "react-dnd-html5-backend";
import Dashboard from "./View/Components/Dashboard.tsx/Dashboard";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import LineTo, { SteppedLineTo } from "react-lineto";
import KeywordTree from "./View/Components/Dashboard.tsx/KeywordTree/KeywordTree";
import Xarrow from "react-xarrows";
import QuestionNestedList from "./View/Components/Dashboard.tsx/Main/QuestionList/QuestionList";
import LinearWithValueLabel from "./View/Commons/LinearProgress/LinearProgress";
import QuestionProcessingModal from "./View/Commons/QuestionProcessingModal/QuestionProcessingModal";
import ReactTreeSortable from "./View/Components/Dashboard.tsx/Main/ReactTreeSortable/ReactTreeSortable";
const boxStyle = {
    border: "1px #999 solid",
    borderRadius: "10px",
    textAlign: "center",
    width: "100px",
    height: "30px",
    color: "black",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
};

const Test = () => {
    const box1Ref = useRef(null);
    const box2Ref = useRef(null);
    return (
        <ul
            style={{
                display: "flex",
                flexDirection: "column",
                width: "500px",
                // position: "absolute",
                marginTop: `200px`,
            }}
        >
            <li id="elem1" style={boxStyle}>
                elem1
                <ul>
                    <li
                        style={{
                            ...boxStyle,
                            position: "relative",
                            left: "100px",
                        }}
                    >
                        elem2
                    </li>
                </ul>
            </li>
            <li
                id="elem2"
                style={{ ...boxStyle, position: "relative", left: "100px" }}
            >
                elem2
            </li>
            <li
                id="elem3"
                style={{ ...boxStyle, position: "relative", left: "100px" }}
            >
                elem2
            </li>
            <Xarrow
                start="elem1"
                end="elem2"
                showHead={false}
                startAnchor={{ position: "bottom", offset: { rightness: -30 } }}
                path={"grid"}
            />
            <Xarrow
                start="elem1"
                end="elem3"
                showHead={false}
                startAnchor={{ position: "bottom", offset: { rightness: -30 } }}
                path={"grid"}
            />
        </ul>
    );
};

const App = (props) => {
    const dispatch = useDispatch();
    // const { active } = useSelector((state: RootState) => state.app);
    console.log("location", props.location);

    return (
        <main>
            <DndProvider backend={HTML5Backend}>
                <Switch>
                    <Router>
                        <Route
                            exact
                            path="/"
                            render={() => (
                                <div className="App">
                                    <Dashboard />
                                </div>
                            )}
                        />

                        <Route
                            exact
                            path="/t"
                            render={() => (
                                <div className="App">
                                    <ReactTreeSortable />
                                    <ReactTreeSortable />
                                </div>
                            )}
                        />

                        <Route
                            exact
                            path="/test"
                            render={() => (
                                <div
                                    className="App"
                                    style={{ textAlign: `center` }}
                                    key={"abasca"}
                                >
                                    <div className="A">Element A</div>
                                    <div className="">Element B</div>

                                    <div className="">Element B</div>

                                    <div className="">Element B</div>

                                    <div style={{ marginLeft: `250px` }}>
                                        <span className="B"> Element C</span>
                                    </div>
                                    <SteppedLineTo
                                        from="A"
                                        to="B"
                                        delay={0}
                                        borderWidth="2"
                                        borderStyle="solid"
                                        borderColor="green"
                                        zIndex={1000}
                                        // fromAnchor="top"
                                    />
                                </div>
                            )}
                        />
                    </Router>
                </Switch>
            </DndProvider>
        </main>
    );
};

export default App;

const x = (
    <Draggable
    // position={pos}
    >
        <div>
            <div className="handle">Drag from here</div>
            <div>This readme is really dragging on...</div>
        </div>
    </Draggable>
);
