import React from "react";
import { Card } from "react-bootstrap";

interface ISCardProps {
    text:string;
    picture: string;
    goForward: (index: number)=> void;
    index: number;
    saveAnswer:(index:number, data:any) => void;
    hasNext:boolean;
    isActive: boolean;
    showResult:()=>void;
    color?:string;
}

export const SCard:React.FunctionComponent<ISCardProps> = (props) => {
    const chooseAnswer = ():void =>{
        props.saveAnswer(props.index, props.text);
        props.hasNext ? props.goForward(props.index+1): props.showResult();
    }

    return (
        <Card className={props.isActive ? "SCard active pointer": "SCard pointer"} style={{backgroundColor: `${props.color}`,minHeight:`3rem`}} onClick={()=>{chooseAnswer()}}>
            {props.picture && <Card.Img className={"SCard__Image p-2"}variant="top" src={props.picture} />}
            <Card.Body className={"p-2"}>
                {!props.color && <Card.Title>{props.text}</Card.Title>}
            </Card.Body>
        </Card>
    );
};
