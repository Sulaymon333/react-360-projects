import React from 'react';
import { AppRegistry, asset, Image, NativeModules, StyleSheet, Text, View, VrButton } from 'react-360';

const surfaceModule = NativeModules.surfaceModule;

class InfoPanel extends React.Component {
    state = {
        img: {
            name: 'info.png',
            width: 100,
            height: 100,
        },
    };

    transformDisplay(id) {
        this._changeSurfaceDimensions(500, 400, id);
        this.setState({
            img: {
                name: `${id}.jpg`,
                width: 500,
                height: 300,
            },
        });
    }

    resetPanel(id) {
        this._changeSurfaceDimensions(100, 100, id);
        this.setState({
            img: {
                name: 'info.png',
                width: 100,
                height: 100,
            },
        });
    }

    _changeSurfaceDimensions(width, height, id) {
        surfaceModule.resizeSurface(width, height, id);
    }

    render() {
        let { img } = this.state;

        return (
            <View
                style={styles.displayPanel}
                hitSlop={205}
                onEnter={() => this.transformDisplay(this.props.id)}
                onExit={() => this.resetPanel(this.props.id)}
            >
                <Image source={asset(`${img.name}`)} style={{ width: img.width, height: img.height }} />
                <View style={styles.attractionBox}>
                    <Text style={styles.attractionText}>{this.props.text}</Text>
                </View>
            </View>
        );
    }
}

export default class TurkuCityCenterVR extends React.Component {
    render() {
        return (
            <View>
                <Image source={asset('turku-city-flag.png')} style={{ width: 500, height: 300 }} />
                <View style={styles.attractionBox}>
                    <VrButton onClick={() => surfaceModule.start()}>
                        <Text style={styles.attractionText}>
                            Welcome to Beautiful Turku City Center. Click Here to Explore!
                        </Text>
                    </VrButton>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    displayPanel: {
        width: 100,
        height: 100,
        flexDirection: 'column',
    },
    attractionBox: {
        padding: 20,
        backgroundColor: '#F7F7F7',
        borderColor: '#14106e',
        borderWidth: 5,
        width: 500,
        // boxSizing: 'border-box',
    },
    attractionText: {
        fontSize: 30,
        color: '#14106e',
    },
});

AppRegistry.registerComponent('TurkuCityCenterVR', () => TurkuCityCenterVR);
AppRegistry.registerComponent('InfoPanel', () => InfoPanel);
