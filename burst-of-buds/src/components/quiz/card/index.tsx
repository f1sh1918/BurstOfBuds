import React, { useState } from "react";
import { Card } from "react-bootstrap";

interface ISCardProps {
    text:string;
    picture: string;
    goForward: (index: number)=> void;
    index: number;
}

export const SCard:React.FunctionComponent<ISCardProps> = (props) => {
    const [active, setActive] = useState(false);
    return (
        <Card className={active ? "SCard active pointer": "SCard pointer"} onClick={()=>{setActive(!active); props.goForward(props.index+1)}}>
            <Card.Img className={"SCard__Image p-2"}variant="top" src={props.picture} />
            <Card.Body className={"p-2"}>
                <Card.Title>{props.text}</Card.Title>
            </Card.Body>
        </Card>
    );
};
