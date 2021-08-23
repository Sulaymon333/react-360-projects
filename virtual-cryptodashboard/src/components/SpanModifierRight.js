import React from "react";
import { Text, StyleSheet } from "react-360";

class SpanModifierRight extends React.Component {
  render() {
    return <Text style={styles.span}>{this.props.children}</Text>;
  }
}
const styles = StyleSheet.create({
  span: {
    color: "#058beb",
  },
});

export default SpanModifierRight;
