import React from 'react';
import { View, asset, Environment } from 'react-360';
import VideoModule from 'VideoModule';

export default class Beach extends React.Component {
    beachVideo = VideoModule.createPlayer('beach');

    componentDidMount() {
        this.beachVideo.play({
            source: { url: asset('./video/beach.mp4').uri },
            muted: false,
            volume: 0.1,
        });

        Environment.setBackgroundVideo('beach', { rotatetTransform: [{ rotateY: '180deg' }] });
    }

    render() {
        return <View />;
    }
}
