import { nanoid } from "nanoid";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import Xarrow from "react-xarrows";
import { Container } from "../../../../../../../../Redux/Features/MainTreeHandle/reducer";
import { IRootState } from "../../../../../../../../Redux/Store/Reducers/combineReducers";
import QuestionNestedList from "./../../../../QuestionList/QuestionList";

type Props = {};

const QuestionListContainer = ({}: Props) => {
    const listContainer = useSelector(
        (state: IRootState) => state.mainTreeHandle.listContainer
    );

    return (
        <div style={{ display: `flex`, flexDirection: `row` }}>
            {listContainer.length
                ? listContainer.map((container: Container) => {
                      const idForArrowBetweenKeyWordAndContainer = nanoid();
                      return (
                          <Fragment key={container.keyword.id}>
                              <QuestionNestedList
                                  container={container}
                                  id={idForArrowBetweenKeyWordAndContainer}
                              />
                              {/* <Xarrow
                                  key={nanoid()}
                                  start={container.keyword.id}
                                  end={idForArrowBetweenKeyWordAndContainer}
                                  path={"grid"}
                                  gridBreak={`100%`}
                                  showHead={true}
                                  // labels="Related"
                                  animateDrawing={true}
                                  strokeWidth={2}
                                  // startAnchor="right"
                                  // endAnchor="top"
                                  startAnchor="right"
                                  endAnchor="top"
                                  zIndex={800}
                                  // dashness={true}
                              /> */}
                          </Fragment>
                      );
                  })
                : void 0}
        </div>
    );
};

export default QuestionListContainer;
