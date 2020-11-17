import React from "react";
import { Accordion, Card } from "react-bootstrap";

interface ISummaryProps {
    questions: any[];
}

export const Summary: React.FunctionComponent<ISummaryProps> = (props) => {
    return (
        <Accordion>
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0">
                    Zusammenfassung
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>{props.questions.map((question, index) => {
                        return <div>
                            <strong>{`${index + 1}.${question.question} `}</strong>
                            {question.answer}
                        </div>;
                    })}</Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
};

