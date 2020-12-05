import React, { Component } from "react";
import Camera, { IMAGE_TYPES } from "react-html5-camera-photo";
import 'react-html5-camera-photo/build/css/index.css';
import PicturePanel from "./picturePanel";

class CameraShot extends Component {

    state = {
        showCamera: true,
        dataUri: undefined
    }
    handleTakePhoto (dataUri:any) {
        // Do stuff with the photo...
        console.log('takePhoto', dataUri);
        this.setState({dataUri: dataUri, showCamera: false})

    }


    render() {
        const  {dataUri, showCamera} = this.state;

        return (
            <>
                { showCamera && <div className={"Camera__Wrapper"}><Camera
                onTakePhoto = { (dataUri:any) => { this.handleTakePhoto(dataUri); } }
                imageType = {IMAGE_TYPES.JPG}
                imageCompression = {0.97}
                isFullscreen={true}
                /></div>}
        {dataUri && <PicturePanel dataUri={dataUri}/>}
        </>
        );
    }
}


export default CameraShot;
