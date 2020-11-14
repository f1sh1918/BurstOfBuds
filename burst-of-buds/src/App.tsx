import React from "react";
import { Container } from "react-bootstrap";

import { Quiz } from "./components/quiz";
import { SCard } from "./components/quiz/card";
import { ResultCard } from "./components/results/resultCard";
import quizData from "./data/questions.json";
import plantData from "./data/plants.json";

interface IAppProps {
}

interface IAppState {
    activeQuestion: number;
    questions: any[];
    showResult: boolean;
    results: any[];
}

class App extends React.Component<IAppProps, IAppState> {

    constructor(props: IAppProps) {
        super(props);
        this.state = {
            activeQuestion: 0,
            questions: quizData.questions,
            showResult: false,
            results: plantData.plants
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
        this.checkResult();
    };

    checkResult = (): void => {
        const plantsFiltered = this.state.results.map((plant: any) => {
            let count = 0;
            console.log(plant);
            plant.answers.forEach((answer: any, index: number) => {
                if (answer === this.state.questions[index].answer) {
                    count = count + 1;
                }
            });
            return { ...plant, percent: Math.round((count / plant.answers.length) * 100) / 100 };
        }).sort((a, b) => b.percent - a.percent);

        this.setState({ results: plantsFiltered });
    };

    public render() {
        const { activeQuestion, questions, showResult } = this.state;
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
                            <>
                                <div>
                                    <strong>Zusammenfassung:</strong>
                                    {questions.map((question, index) => {
                                        return <div><strong>{index + 1}:</strong> {question.answer}</div>;
                                    })}
                                </div>
                                <div className={"Results mt-2"}>
                                    <div><strong>Ergebnisse:</strong></div>
                                    <div className={"SCard__Wrapper"}>

                                        {this.state.results.map((result: any) => {
                                            return <ResultCard
                                                picture={result.picture}
                                                name={result.name}
                                                percent={result.percent}
                                                info={result.info}
                                            />;
                                        })}</div>
                                </div>
                            </>
                        }


                    </main>
                </Container>
            </div>
        );
    }
}

export default App;
