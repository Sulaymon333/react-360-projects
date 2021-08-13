import { AppRegistry, Image, NativeModules, StyleSheet, Text, View, VrButton, asset } from 'react-360';
import { changeRoom, connect } from './store';

import React from 'react';

const { AudioModule } = NativeModules;

class AudioPanel extends React.Component {
    playAmbientSound = () => {
        AudioModule.playEnvironmental({
            source: asset('audio/ambient.wav'),
            volume: 0.3,
        });
    };

    stopAmbientSound = () => {
        AudioModule.stopEnvironmental();
    };
    render() {
        return (
            <View style={styles.audioPanel}>
                <VrButton onClick={() => this.playAmbientSound()}>
                    <Image style={{ height: 50, width: 50 }} source={asset('images/audioOn.png')} />
                </VrButton>
                <VrButton onClick={() => this.stopAmbientSound()}>
                    <Image style={{ height: 50, width: 50 }} source={asset('images/audioOff.png')} />
                </VrButton>
            </View>
        );
    }
}

class HouseInfoPanel extends React.Component {
    render() {
        return (
            <View>
                <View style={styles.infoPanel}>
                    <Text style={styles.header}>Room Info</Text>
                    <Text style={{ fontSize: 25, fontWeight: 'bold', paddingTop: '1rem', paddingBottom: '1rem' }}>
                        {this.props.info}
                    </Text>
                </View>
            </View>
        );
    }
}

class Button extends React.Component {
    state = {
        hover: false,
    };

    handleClick(roomSelection) {
        changeRoom(roomSelection);
    }

    render() {
        return (
            <VrButton
                style={this.state.hover ? styles.hover : styles.button}
                onEnter={() => this.setState({ hover: true })}
                onExit={() => this.setState({ hover: false })}
                onClick={() => this.handleClick(this.props.room)}
            >
                <Text
                    style={{
                        backgroundColor: 'green',
                        padding: '2rem',
                        textAlign: 'center',
                    }}
                >
                    {this.props.room.replace('_', ' ')}
                </Text>
            </VrButton>
        );
    }
}

export default class ButtonInfoPanel extends React.Component {
    createRoomButtons(adjacentRooms) {
        let rooms = adjacentRooms;
        let buttons = [];

        rooms.map((room) => buttons.push(<Button key={`${room}` + 'button'} room={room} />));
        return buttons;
    }
    render() {
        return (
            <View>
                <View style={styles.buttonPanel}>
                    <Text style={styles.header}>Room Selection</Text>
                    {this.createRoomButtons(this.props.adjacentRooms)}
                    <AudioPanel />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    audioPanel: { flexDirection: 'row' },
    infoPanel: {
        width: 400,
        height: 420,
        opacity: 0.8,
        backgroundColor: 'rgba(178, 179, 178, 0.6)',
        borderColor: 'rgb(255,255,255)',
        borderWidth: 5,
        borderRadius: 20,
        padding: 30,
    },
    buttonPanel: {
        width: 400,
        height: 420,
        opacity: 0.8,
        backgroundColor: 'rgba(178, 179, 178, 0.5)',
        borderColor: 'rgb(255,255,255)',
        borderWidth: 5,
        borderRadius: 20,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 10,
    },
    header: {
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    button: {
        width: 200,
        borderColor: 'rgb(255, 255, 255)',
        borderWidth: 5,
    },
    hover: {
        width: 200,
        backgroundColor: 'rgb(0, 45, 72)',
        borderWidth: 5,
        borderColor: 'rgb(255, 255, 255)',
    },
});

const ConnectedButtonInfoPanel = connect(ButtonInfoPanel);
const ConnectedHouseInfoPanel = connect(HouseInfoPanel);

AppRegistry.registerComponent('ConnectedButtonInfoPanel', () => ConnectedButtonInfoPanel);
AppRegistry.registerComponent('ConnectedHouseInfoPanel', () => ConnectedHouseInfoPanel);
