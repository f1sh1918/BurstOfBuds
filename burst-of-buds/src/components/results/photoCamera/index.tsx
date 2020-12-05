import React, { Component } from "react";
import Camera, { FACING_MODES, IMAGE_TYPES } from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import PicturePanel from "./picturePanel";

interface ICameraShotProps {
    name: string;
}

interface ICameraShotState {
    showCamera: boolean;
    dataUri: string | undefined;
}

class CameraShot extends React.Component<ICameraShotProps, ICameraShotState> {

    state = {
        showCamera: true,
        dataUri: undefined
    };

    handleTakePhoto(dataUri: any) {
        // Do stuff with the photo...
        this.setState({ dataUri: dataUri, showCamera: false });

    }

    render() {
        const { dataUri, showCamera } = this.state;
        const { name } = this.props;

        return (
            <>
                {showCamera && <div className={"Camera__Wrapper"}><Camera
                    onTakePhoto={(dataUri: any) => {
                        this.handleTakePhoto(dataUri);
                    }}
                    imageType={IMAGE_TYPES.JPG}
                    imageCompression={0.97}
                    isFullscreen={true}
                    idealFacingMode = {FACING_MODES.ENVIRONMENT}
                    isImageMirror={false}
                /></div>}
                {dataUri && <PicturePanel dataUri={dataUri} name={name}/>}
            </>
        );
    }
}

export default CameraShot;
