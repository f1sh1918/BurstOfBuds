import React from "react";
import { Container } from "react-bootstrap";
import { IoMdRefresh, IoMdTrash } from "react-icons/io";

import { Quiz } from "./components/quiz";
import { ResultCard } from "./components/results/resultCard";
import { Summary } from "./components/results/summary";
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
        const pictureStorage: any[] = localStorage.getItem("Pictures") ? JSON.parse(localStorage.getItem("Pictures") as string) : [];
        const results = plantData.plants.map((plant: any) => {
            const images = plant.images ?? [];
            const filteredItems = pictureStorage.filter((element: any) => element.alt === plant.name);

            if (filteredItems.length) {

                filteredItems.forEach((element: any) => {
                    // TODO remove workaround and check why its rendered twice 
                 const index =  images.findIndex((el:any)=> el.src === element.src);
                 index === -1 && images.push(element);
                });

            }
            const newPlant = { ...plant, images: images };
            return newPlant;
        });

        this.state = {
            activeQuestion: 0,
            questions: quizData.questions,
            showResult: false,
            results: results
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
            const matches: any[] = [];
            const noMatches: any[] = [];
            plant.answers.forEach((answer: any, index: number) => {
                const multiple = answer.includes("|") ? answer.split("|", 3) : null;
                if (answer === this.state.questions[index].answer || (multiple?.includes(this.state.questions[index].answer))) {
                    matches.push(answer);
                } else {
                    noMatches.push(answer);
                }
            });
            return {
                ...plant,
                percent: Math.round((matches.length / plant.answers.filter((el: string) => el !== "").length) * 100) / 100,
                matches: matches,
                noMatches: noMatches
            };
        }).sort((a, b) => b.matches.length - a.matches.length).sort((a, b) => b.percent - a.percent);

        this.setState({ results: plantsFiltered });
    };

    restart = (): void => {
        this.setState({
            activeQuestion: 0,
            showResult: false
        });

    };
    getRemainingStorage = () => {
        const test = new Blob(Object.values(localStorage)).size;
        console.log(test);
        return Math.round((5-(test/1000000))*100)/100;
    }

    public render() {
        const { activeQuestion, questions, showResult } = this.state;
        return (
            <div className="App">
                <Container>
                    <header className="App-header p-2">
                        <div><IoMdRefresh size={"24px"}className={"Header__Icon-Restart"} onClick={() => this.restart()} /></div>
                        <div>Burst of Buds</div>
                        <div className={"Header__Question"}>
                            {`${activeQuestion + 1}/${questions.length}`}
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
                                    <Summary questions={questions} />

                                </div>
                                <div className={"Results mt-2"}>
                                    <div><strong>Ergebnisse:</strong></div>
                                    <div className={"SCard__Wrapper"}>

                                        {this.state.results.map((result: any, index: number) => {
                                            return index < 50 && <ResultCard
                                                picture={result.picture}
                                                name={result.name}
                                                percent={result.percent}
                                                matches={result.matches}
                                                noMatches={result.noMatches}
                                                info={result?.info}
                                                images={result.images}
                                                key={result.picture}
                                            />;
                                        })}</div>
                                    <div className={"mt-3 pointer"}><strong>Remaining Storage:</strong> {this.getRemainingStorage()}MB</div>
                                    <div onClick={() => localStorage.clear()} ><IoMdTrash size={"24px"} className={"Header__Icon-Restart"} />Clear Local Storage</div>
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
