import React from "react";
import { Animated, AppRegistry, asset, View } from "react-360";
import Entity from "Entity";
import { connect } from "./store";
import ConnectedLeftPanel from "./src/components/LeftPanel";
import ConnectedRightPanel from "./src/components/RightPanel";

const AnimatedEntity = Animated.createAnimatedComponent(Entity);

export default class VirtualCryptoDashboard extends React.Component {
  state = {
    rotation: new Animated.Value(0),
    bounceValue: new Animated.Value(0.4),
  };
  bounce({ value, initial, toValue, friction = 1.5 }) {
    value.setValue(initial);
    Animated.spring(value, { toValue, friction }).start();
  }
  componentDidMount() {
    Animated.loop(Animated.timing(this.state.rotation, { toValue: 360, duration: 6000 })).start();
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.crypto !== nextProps.crypto) {
      const cryptoConfig = {
        value: this.state.bounceValue,
        initial: 0.1,
        toValue: 0.4,
        friction: 5,
      };
      this.bounce(cryptoConfig);
    }
  }
  rotations = {
    BTC: {
      rotateX: 90,
      rotateY: 0,
      rotateZ: this.state.rotation,
    },
    DASH: {
      rotateX: 0,
      rotateY: this.state.rotation,
      rotateZ: 0,
    },
    XMR: {
      rotateX: 0,
      rotateY: this.state.rotation,
      rotateZ: 0,
    },
    ZEN: {
      rotateX: 0,
      rotateY: this.state.rotation,
      rotateZ: 0,
    },
  };
  render() {
    return (
      <View>
        <AnimatedEntity
          style={{
            transform: [
              { scaleX: this.state.bounceValue },
              { scaleY: this.state.bounceValue },
              { scaleZ: this.state.bounceValue },
              { rotateX: this.rotations[`${this.props.crypto}`].rotateX },
              { rotateY: this.rotations[`${this.props.crypto}`].rotateY },
              { rotateZ: this.rotations[`${this.props.crypto}`].rotateZ },
            ],
          }}
          source={{ obj: asset(`models/${this.props.crypto}.obj`), mtl: asset(`models/${this.props.crypto}.mtl`) }}
        />
      </View>
    );
  }
}

const ConnectedVirtualCryptoDashboard = connect(VirtualCryptoDashboard);

AppRegistry.registerComponent("ConnectedLeftPanel", () => ConnectedLeftPanel);
AppRegistry.registerComponent("ConnectedRightPanel", () => ConnectedRightPanel);
AppRegistry.registerComponent("ConnectedVirtualCryptoDashboard", () => ConnectedVirtualCryptoDashboard);
