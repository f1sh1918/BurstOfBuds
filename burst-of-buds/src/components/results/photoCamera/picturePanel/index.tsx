import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { IoMdCamera, IoMdSave } from "react-icons/io";

interface IPicturePanelProps {
    dataUri?: string ;
}

export const PicturePanel: React.FunctionComponent<IPicturePanelProps> = (props) => {

    const savePicture = () => {
       dataUri && localStorage.setItem('Picture', props.dataUri ?? "");
       setShowModal(false);
    }

    const [showModal, setShowModal] = useState(true);
    const {dataUri} = props;
    return (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Aufnahme</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <img src={dataUri} className={"w-100"}/>
            </Modal.Body>
            <Modal.Footer>
                <IoMdCamera onClick={()=>{setShowModal(false)}}/>
                <IoMdSave onClick={()=>savePicture()}/>
            </Modal.Footer>
        </Modal>
    );
};

export default PicturePanel;
