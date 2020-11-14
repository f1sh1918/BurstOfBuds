import React from "react";
import { Container } from "react-bootstrap";

import { Quiz } from "./components/quiz";
import quizData from "./data/questions.json";

interface IAppProps {
}

interface IAppState {
    activeQuestion: number;
    questions: any[];
    showResult: boolean;
}

class App extends React.Component<IAppProps, IAppState> {

    constructor(props: IAppProps) {
        super(props);
        this.state = {
            activeQuestion: 0,
            questions: quizData.questions,
            showResult: false
        };
    }

    goForward = (nextQuestion: number): void => {
        this.setState({ activeQuestion: nextQuestion });
    };

    saveAnswer = (currentIndex: number, answer: any): void => {
        const questionUpdated = this.state.questions;
        questionUpdated[currentIndex].answer = answer;
        this.setState({ questions: questionUpdated });
    };

    showResult = (): void => {
        this.setState({ showResult: true });
    };

    public render() {
        const { activeQuestion, questions, showResult } = this.state;
        console.log("questions", questions);
        return (
            <div className="App">
                <Container>
                    <header className="App-header">
                        <div className={"Header__Wrapper p-2"}>
                            <span>Burst of Buds</span>
                            <span className={"Header__Question py-2"}>
                                {`Frage: ${activeQuestion + 1}/${questions.length}`}
                            </span>
                        </div>

                    </header>
                    <main>
                        {!showResult ? <Quiz
                                questions={questions}
                                currentQuestion={activeQuestion}
                                goForward={this.goForward}
                                saveAnswer={this.saveAnswer}
                                showResult={this.showResult}
                            /> :
                            <div>
                                <strong>Zusammenfassung:</strong>
                                {questions.map((question, index) => {
                                    return <div><strong>{index + 1}:</strong> {question.answer}</div>;
                            })}</div>}

                    </main>
                </Container>
            </div>
        );
    }
}

export default App;
