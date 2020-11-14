import React from "react";

import { SCard } from "./card";

interface IQuizProps {
    currentQuestion: number;
    goForward: (index: number) => void;
    questions: any[];
    saveAnswer: (index: number, data: any) => void;
    showResult: () => void;
}

export const Quiz: React.FunctionComponent<IQuizProps> = (props) => {
    return (
        <div>
            <div className={"Quiz__Question py-3"}>
                {props?.questions[props?.currentQuestion]?.question}
            </div>
            <div className={"SCard__Wrapper"}>
                {props.questions[props.currentQuestion].answers.map((element: any, index: number) => {
                    return <SCard
                        key={element.text}
                        hasNext={props.questions.length - 1 > props.currentQuestion}
                        isActive={element.text === props.questions[props.currentQuestion]?.answer}
                        picture={element?.picture}
                        text={element.text}
                        goForward={props.goForward}
                        saveAnswer={props.saveAnswer}
                        index={props.currentQuestion}
                        showResult={props.showResult}
                    />;
                })}
            </div>
            {props.currentQuestion > 0 &&
            <a className={"text-success pointer"} onClick={() => {
                props.goForward(props.currentQuestion - 1);
            }}>
                {"< zurück zur vorherigen Frage"}
            </a>
            }
        </div>
    );
};

