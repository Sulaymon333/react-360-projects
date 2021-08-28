import React from 'react';
import { View, asset, Environment } from 'react-360';
import VideoModule from 'VideoModule';

export default class Promo extends React.Component {
    promoVideo = VideoModule.createPlayer('promo');

    componentDidMount() {
        Environment.setBackgroundImage(asset('city-bg.jpeg'), { rotatetTransform: [{ rotateY: '180deg' }] });

        this.promoVideo.play({
            source: { url: asset('./video/spi.mp4').uri },
            muted: false,
            volume: 0.1,
            loop: true,
        });

        Environment.setScreen('default', 'promo', 'main', 0, 0, 800, 450);
    }
    ComponentWillUnmount() {
        Environment.setScreen('default', 'null', 'main', 0, 0, 800, 450);
        this.promoVideo.destroy();
    }

    render() {
        return <View style={{ width: 800, height: 450 }} />;
    }
}
