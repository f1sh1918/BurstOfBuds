import React from "react";
import { Container } from "react-bootstrap";
import { IoMdRefresh } from "react-icons/io";

import { Quiz } from "./components/quiz";
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
            plant.answers.forEach((answer: any, index: number) => {
                const multiple = answer.includes("|") ? answer.split("|", 2) : null;
                if (answer === this.state.questions[index].answer || (multiple?.includes(this.state.questions[index].answer))) {
                    count = count + 1;
                }
            });
            return {
                ...plant,
                percent: Math.round((count / plant.answers.filter((el: string) => el !== "").length) * 100) / 100,
                count: count
            };
        }).sort((a, b) => b.count - a.count).sort((a, b) => b.percent - a.percent);

        this.setState({ results: plantsFiltered });
    };

    restart = (): void => {
        this.setState({
            activeQuestion: 0,
            showResult: false
        });

    };

    public render() {
        const { activeQuestion, questions, showResult } = this.state;
        return (
            <div className="App">
                <Container>
                    <header className="App-header">
                        <div className={"Header__Wrapper p-2"}>
                            <span><IoMdRefresh className={"Header__Icon-Restart"} onClick={() => this.restart()} /></span>
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

                                        {this.state.results.map((result: any, index: number) => {
                                            return index < 40 && <ResultCard
                                                picture={result.picture}
                                                name={result.name}
                                                percent={result.percent}
                                                count={result.count}
                                                info={result?.info}
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
