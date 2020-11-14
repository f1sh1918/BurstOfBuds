import React, { useState } from "react";
import { Card, Modal, Image } from "react-bootstrap";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface IResultCardProps {
    text?: string;
    name: string;
    picture: string;
    percent: number;
    info?: any;
}

export const ResultCard: React.FunctionComponent<IResultCardProps> = (props) => {
    console.log("percent", props.percent);
    const [showModal, setShowModal] = useState(false);

    const card = (
        <Card className={"SCard pointer"} onClick={() => setShowModal(true)}>
            {props.picture && <Card.Img className={"SCard__Image p-2"} variant="top" src={props.picture} />}
            <Card.Body className={"p-2"}>
                <Card.Title>{props.name}</Card.Title>
                <div className={"CircularProgressbar__Wrapper"}>
                    <CircularProgressbar value={props.percent} maxValue={1} text={`${props.percent * 100}%`} styles={buildStyles({
                        // Rotation of path and trail, in number of turns (0-1)
                        rotation: 0.25,

                        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                        strokeLinecap: "butt",

                        // Text size
                        textSize: "26px",

                        // How long animation takes to go from one percentage to another, in seconds
                        pathTransitionDuration: 0.5,

                        // Can specify path transition in more detail, or remove it entirely
                        // pathTransition: 'none',

                        // Colors
                        pathColor: `rgba(62, 152, 199, ${props.percent})`,
                        textColor: "#f88",
                        trailColor: "#d6d6d6",
                        backgroundColor: "#3e98c7",
                    })} />
                </div>
            </Card.Body>
        </Card>
    );

    const modal = (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>{props.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Image className="w-100 ResultCard__Image" src={props.picture} rounded />
                <strong>
                    <p className={"text-center"} dangerouslySetInnerHTML={{ __html: props.info }} />
                </strong>
            </Modal.Body>
        </Modal>
    );
    return (
        <>
            {card}
            {modal}
        </>
    );
};

