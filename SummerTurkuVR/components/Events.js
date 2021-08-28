import React from 'react';
import { asset, Environment, Image, NativeModules, StyleSheet, Text, View, VrButton } from 'react-360';

const { AudioModule } = NativeModules;

const PHOTOS = [
    { uri: 'lildollarz.jpg', title: 'Lil Dollarz - March 8th', audio: 'lildollarz.mp3' },
    { uri: 'thephilosophy.jpg', title: 'The Philosophy - March 9th', audio: 'thephilosophy.mp3' },
    { uri: 'emilywhite.jpg', title: 'Emily White - March 15th', audio: 'emilywhite.mp3' },
    { uri: 'banjobanjo.jpg', title: 'Banjo banjo - March 16th', audio: 'banjobanjo.mp3' },
    { uri: 'johnwhite.jpg', title: 'John White - March 22th', audio: 'johnwhite.mp3' },
];

class EventImage extends React.Component {
    render() {
        return (
            <View>
                <Image style={{ width: 800, height: 300 }} source={asset(this.props.uri)} />
            </View>
        );
    }
}

export default class Events extends React.Component {
    state = { index: 0 };

    componentDidMount() {
        Environment.setBackgroundImage(asset('party.jpg'));

        AudioModule.playEnvironmental({
            source: asset(`audio/${PHOTOS[this.state.index].audio}`),
            volume: 0.02,
        });
    }

    componentDidUpdate() {
        AudioModule.playEnvironmental({
            source: asset(`audio/${PHOTOS[this.state.index].audio}`),
            volume: 0.1,
        });
    }

    componentWillUnmount() {
        AudioModule.stopEnvironmental();
    }

    previousPhoto = () => {
        let prev = this.state.index - 1;
        if (prev < 0) {
            prev += PHOTOS.length;
        }

        this.setState({ index: prev });
    };
    nextPhoto = () => {
        let next = this.state.index + 1;
        if (next > PHOTOS.length - 1) {
            next = 0;
        }

        this.setState({ index: next });
    };
    render() {
        const current = PHOTOS[this.state.index % PHOTOS.length];
        return (
            <View>
                <EventImage uri={current.uri} />
                <View style={styles.controls}>
                    <VrButton style={styles.button} onClick={this.previousPhoto}>
                        <Text style={styles.buttonText}>{'<'}</Text>
                    </VrButton>
                    <View>
                        <Text style={styles.title}>{current.title}</Text>
                    </View>
                    <VrButton style={styles.button} onClick={this.nextPhoto}>
                        <Text style={styles.buttonText}>{'>'}</Text>
                    </VrButton>
                </View>
            </View>
        );
    }
}

const styles = {
    controls: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 800,
        padding: 10,
    },
    title: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    button: {
        width: 40,
        height: 44,
        borderRadius: 5,
        backgroundColor: '#c0c0d0',
    },
    buttonText: {
        textAlign: 'center',
        color: '#000000',
        fontSize: 30,
        fontWeight: 'bold',
    },
};
