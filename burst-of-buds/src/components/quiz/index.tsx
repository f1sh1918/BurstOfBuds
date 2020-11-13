import React from "react";

import { SCard } from "./card";

interface IQuizProps {
    currentQuestion: number;
    goForward: (index: number) => void;
    questions: any[];
}

export const Quiz: React.FunctionComponent<IQuizProps> = (props) => {
    return (
        <div>
            <div className={"Quiz__Question p-2"}>{props.questions[props.currentQuestion].question}</div>
            <div className={"SCard__Wrapper"}>
                {props.questions[props.currentQuestion].answers.map((element: any, index: number) => {
                    return <SCard
                        key={`${element.text}_${index}`}
                        picture={element.picture}
                        text={element.text}
                        goForward={props.goForward}
                        index={props.questions.length <= props.currentQuestion ? props.currentQuestion : 0}
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

