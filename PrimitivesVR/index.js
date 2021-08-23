import { AppRegistry, Box, Cylinder, Plane, Sphere, StyleSheet, View } from 'react-360';

import React from 'react';

export default class PrimitivesVR extends React.Component {
    render() {
        return (
            <View>
                <Box
                    dimWidth={0.5}
                    dimHeight={0.5}
                    dimDepth={0.5}
                    style={{ color: 'green', transform: [{ translate: [-1, 0, 0] }] }}
                />
                <Cylinder
                    radiusTop={0.5}
                    radiusBottom={0.25}
                    dimHeight={1}
                    segments={24}
                    style={{ color: 'blue', transform: [{ translate: [0, 0, 0] }] }}
                />
                <Sphere
                    radius={0.5}
                    widthSegments={24}
                    heightSegments={24}
                    style={{ color: 'red', transform: [{ translateX: 1 }] }}
                />
                <Plane
                    dimWidth={10}
                    dimHeight={10}
                    style={{ color: 'orange', transform: [{ translate: [0, -1, -3] }, { rotateX: -90 }] }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    panel: {
        // Fill the entire surface
        width: 1000,
        height: 600,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    greetingBox: {
        padding: 20,
        backgroundColor: '#000000',
        borderColor: '#639dda',
        borderWidth: 2,
    },
    greeting: {
        fontSize: 30,
    },
});

AppRegistry.registerComponent('PrimitivesVR', () => PrimitivesVR);
