import React, { useState } from "react";
import { Card } from "react-bootstrap";

export const SCard:React.FunctionComponent = () => {
    const [active, setActive] = useState(false);
    return (
        <Card className={active ? "SCard active": "SCard"} onClick={()=>{setActive(!active)}}>
            <Card.Img className={"SCard__Image"}variant="top" src="./assets/knospe_test.png" />
            <Card.Body>
                <Card.Title>gegenständig</Card.Title>
            </Card.Body>
        </Card>
    );
};
