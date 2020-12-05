import React, { useState } from "react";
import { Card, Modal, Image, OverlayTrigger, Popover } from "react-bootstrap";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { IoMdCamera} from "react-icons/io";
import "react-circular-progressbar/dist/styles.css";
import { SCarousel } from "../carousel";
import CameraShot from "../photoCamera";

interface IResultCardProps {
    text?: string;
    name: string;
    picture: string;
    percent: number;
    info?: any;
    matches: any[];
    noMatches: any[];
    images?: any;
}

export const ResultCard: React.FunctionComponent<IResultCardProps> = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [showCamera, setShowCamera] = useState(false);
    const count = props.matches.length;
    console.log("localStorage", localStorage.getItem("Picture"))

    const getColor = (percent: number): string => {
        switch (true) {
            case percent < 25:
                return "red";
            case percent >= 25 && percent < 50:
                return "orange";
            case percent >= 50 && percent < 75:
                return "#fcba03";
            case percent >= 75 :
                return "green";
            default:
                return "";

        }

    };
    const popover = (
        <Popover id="popover-basic">
            <Popover.Title as="h3">{count} Matches</Popover.Title>
            <Popover.Content>
                {props.matches.map((match: any) => {
                    return <div>{match}</div>;
                })}
            </Popover.Content>
        </Popover>
    );

    const card = (
        <Card className={"SCard pointer"} onClick={() => setShowModal(true)}>
            {props.picture && <Card.Img className={"SCard__Image p-2"} variant="top" src={props.picture} />}
            <Card.Body className={"p-2"}>
                <Card.Title>{props.name}</Card.Title>
                <div className={"CircularProgressbar__Wrapper"}>
                    <OverlayTrigger trigger={["hover"]} placement="right" overlay={popover}>
                        <div>
                            <CircularProgressbar value={props.percent} maxValue={1} text={`${Math.round(props.percent * 100)}%`} styles={buildStyles({
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
                                pathColor: getColor(props.percent * 100),
                                textColor: "black",
                                trailColor: "#d6d6d6",
                                backgroundColor: "#3e98c7",
                            })} /></div>
                    </OverlayTrigger>
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
                {props.images ?<SCarousel images={props.images}/> :  <Image className="w-100 ResultCard__Image" src={props.picture} rounded />}
                <div className={"ResultCard__MerkmaleWrapper p-2"}>
                    <div className={"ResultCard__Merkmale text-center"}>
                        <strong>Merkmale:</strong>
                        {props.matches && props.matches.map((match: any, index: number) => {
                            return <div className={"ResultCard__Match"} key={`${match}_${index}`}>{match}</div>;
                        })}
                        {props.noMatches && props.noMatches.map((noMatch: any, index: number) => {
                            if (noMatch.length) {
                                return <div className={"ResultCard__NoMatch"} key={`${noMatch}_${index}`}>{noMatch}</div>;
                            }
                            return null;
                        })}
                    </div>
                    {props.info && <div className={"ResultCard__WeitereMerkmale"}>
                        <div className={"ResultCard__Merkmale-Header text-center"}>
                            <strong>Weitere Merkmale: </strong>
                        </div>

                        <p className={"text-center"} dangerouslySetInnerHTML={{ __html: props.info }} />

                    </div>}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <IoMdCamera onClick={()=>{setShowCamera(true); setShowModal(false)}}/>
            </Modal.Footer>
        </Modal>
    );
    return (
        <>
            {showCamera && <CameraShot name={props.name}/>}
            {card}
            {modal}
        </>
    );
};

