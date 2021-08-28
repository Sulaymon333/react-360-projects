import React from 'react';
import { View, asset, Environment, NativeModules } from 'react-360';
import VideoModule from 'VideoModule';

export default class Promo extends React.Component {
    promoVideo = VideoModule.createPlayer('promo');

    componentDidMount() {
        this.promoVideo.play({
            source: { url: asset('./video/spi.mp4').uri },
            muted: false,
            volum: 0.1,
        });

        Environment.setScreen('default', 'promo', 'main', 0, 0, 800, 450);
    }

    render() {
        <View style={{ width: 800, height: 450 }} />;
    }
}
