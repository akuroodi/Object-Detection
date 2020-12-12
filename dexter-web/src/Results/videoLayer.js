
import React from 'react';
import { Player } from 'video-react';

import DemoVideo from '../DemoFiles/ParkingLot2_Car&People.mp4'

export default function VideoLayer(props) {

    return (
        <div>
            <h1>Video Layer</h1>
            <Player startTime={props.startTime}>
                <source src={DemoVideo} />
            </Player>
        </div>
    );
}