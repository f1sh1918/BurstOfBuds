import React from "react";
import { Button, Container } from "react-bootstrap";
import { SCard } from "./card";

interface IAppProps {
}

class IAppState {
}

class App extends React.Component<IAppProps, IAppState> {
    public render() {
        return (
            <div className="App">
                <Container>

                <header className="App-header">
                    <div>Burst of Buds</div>
                </header>
                <main>
                    <div className={"SCard__Wrapper"}>
                    <SCard/>
                    </div>
                    <Button variant="primary">Primary</Button>
                </main>
                </Container>
            </div>
        );
    }
}

export default App;
