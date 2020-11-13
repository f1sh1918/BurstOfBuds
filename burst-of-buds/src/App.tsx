import React from "react";
import { Container } from "react-bootstrap";

import { Quiz } from "./components/quiz";
import quizData from "./data/questions.json";

interface IAppProps {
}

interface IAppState {
    activeQuestion: number
}

class App extends React.Component<IAppProps, IAppState> {

    constructor(props: IAppProps) {
        super(props);
        this.state = {
            activeQuestion: 0
        };
    }

    goForward = (nextQuestion: number):void => {
        this.setState({activeQuestion:nextQuestion})
    }

    public render() {
        return (
            <div className="App">
                <Container>

                    <header className="App-header">
                        <div className={"Header__Wrapper"}>
                            <span>Burst of Buds</span>
                            <span className={"Header__Question"}>{`Frage: ${this.state.activeQuestion+1}/${quizData.questions.length}`}</span>
                        </div>

                    </header>
                    <main>
                        <Quiz
                            questions={quizData.questions}
                            currentQuestion={this.state.activeQuestion}
                            goForward={this.goForward}/>
                    </main>
                </Container>
            </div>
        );
    }
}

export default App;
