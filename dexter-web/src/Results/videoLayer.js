
import React from 'react';
import { Player } from 'video-react';

// import DemoVideo from '../DemoFiles/D.mp4'

export default function VideoLayer(props) {

    return (
        <div>
            <h1>Video Preview</h1>
            <Player startTime={props.startTime}>
                <source src={props.videoUrl} />
            </Player>
        </div>
    );
}