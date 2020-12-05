import React from "react";
import { Modal } from "react-bootstrap";
import { IoMdCamera, IoMdSave } from "react-icons/io";

interface IPicturePanelProps {
    dataUri?: string;
    name: string;
    setShowCamera: (val: boolean) => void;
    showPanel: boolean;
    setShowPanel: (val: boolean) => void;
}

export const PicturePanel: React.FunctionComponent<IPicturePanelProps> = (props) => {

    const savePicture = () => {
        const pictureStorage: any[] = localStorage.getItem("Pictures") ? JSON.parse(localStorage.getItem("Pictures") as string) : [];
        const item: any = { alt: props.name, src: props.dataUri ?? "" };
        pictureStorage.push(item);
        dataUri && localStorage.setItem("Pictures", JSON.stringify(pictureStorage));
        props.setShowPanel(false);
        props.setShowCamera(false);

    };

    const { dataUri, setShowPanel, setShowCamera } = props;
    return (

        <Modal show={props.showPanel} onHide={() => {
            setShowPanel(false);
            setShowCamera(false);
        }}>
            <Modal.Header closeButton>
                <Modal.Title>Aufnahme</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <img src={dataUri} alt={props.name} className={"w-100"} />
            </Modal.Body>
            <Modal.Footer className={"PicturePanel__Footer"}>
                <IoMdCamera
                    className={"pointer"}
                    size={"24px"}
                    onClick={() => {
                        setShowPanel(false);
                    }} />
                <IoMdSave
                    className={"pointer"}
                    size={"24px"}
                    onClick={() => savePicture()}
                />
            </Modal.Footer>
        </Modal>

    );
};

export default PicturePanel;
