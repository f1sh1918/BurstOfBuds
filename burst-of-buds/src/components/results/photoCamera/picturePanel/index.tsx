import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { IoMdCamera, IoMdSave } from "react-icons/io";

interface IPicturePanelProps {
    dataUri?: string;
    name: string;
}

export const PicturePanel: React.FunctionComponent<IPicturePanelProps> = (props) => {

    const savePicture = () => {
        const pictureStorage: any[] = localStorage.getItem("Pictures") ? JSON.parse(localStorage.getItem("Pictures") as string) : [];
        const item: any = { name: props.name, src: props.dataUri ?? "" };
        pictureStorage.push(item);
        dataUri && localStorage.setItem("Pictures", JSON.stringify(pictureStorage));
        setShowModal(false);
    };

    const [showModal, setShowModal] = useState(true);
    const { dataUri } = props;
    return (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Aufnahme</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <img src={dataUri} className={"w-100"} />
            </Modal.Body>
            <Modal.Footer>
                <IoMdCamera onClick={() => {
                    setShowModal(false);
                }} />
                <IoMdSave onClick={() => savePicture()} />
            </Modal.Footer>
        </Modal>
    );
};

export default PicturePanel;
