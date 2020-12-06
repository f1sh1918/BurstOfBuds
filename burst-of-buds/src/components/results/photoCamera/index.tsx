import React from "react";
import Camera, { FACING_MODES, IMAGE_TYPES } from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import PicturePanel from "./picturePanel";

interface ICameraShotProps {
    name: string;
    showCamera: boolean;
    setShowCamera: (val: boolean) => void;
}

interface ICameraShotState {
    dataUri: string | undefined;
    showPanel: boolean;
}

class CameraShot extends React.Component<ICameraShotProps, ICameraShotState> {

    state = {
        dataUri: undefined,
        showPanel: false
    };

    handleTakePhoto(dataUri: any) {
        // Do stuff with the photo...
        this.setState({ dataUri: dataUri, showPanel: true });

    }

    setShowPanel = (val: boolean) => {
        this.setState({ showPanel: val });
    };

    render() {
        const { dataUri, showPanel } = this.state;
        const { name, showCamera } = this.props;

        return (
            <>
                {showCamera &&
                <div className={"Camera__Wrapper"}>
                    <Camera
                        onTakePhoto={(dataUri: any) => {
                            this.handleTakePhoto(dataUri);
                        }}
                        imageType={IMAGE_TYPES.JPG}
                        imageCompression={0.75}
                        isFullscreen={true}
                        idealFacingMode={FACING_MODES.ENVIRONMENT}
                        isImageMirror={false}
                    />
                </div>}
                {showPanel &&
                <PicturePanel
                    dataUri={dataUri}
                    name={name}
                    setShowCamera={this.props.setShowCamera}
                    showPanel={showPanel}
                    setShowPanel={this.setShowPanel} />}
            </>
        );
    }
}

export default CameraShot;
