import React from "react";
import { Animated, Text, View } from "react-360";
import { connect } from "../../store";
import SpanModifierLeft from "./SpanModifierLeft";
import styles from "./stylesheet.js";

class LeftPanel extends React.Component {
  state = {
    cryptocurrency: {
      open: "",
      close: "",
      high: "",
      low: "",
      volumefrom: "",
      volumeto: "",
    },
    fade: new Animated.Value(0),
  };

  fetchCryptoData(crypto) {
    fetch(`https://min-api.cryptocompare.com/data/histoday?fsym=${crypto}&tsym=USD`)
      .then((response) => response.json())
      .then((data) => {
        const lastDay = data.Data.length - 1;
        this.setState({
          cryptocurrency: {
            open: data.Data[lastDay].open,
            close: data.Data[lastDay].close,
            high: data.Data[lastDay].high,
            low: data.Data[lastDay].low,
            volumefrom: data.Data[lastDay].volumefrom,
            volumeto: data.Data[lastDay].volumeto,
          },
        });
      })
      .catch((e) => console.error(e));
  }
  componentDidMount() {
    this.fetchCryptoData(this.props.crypto);
    Animated.timing(this.state.fade, { toValue: 1, duration: 2000 }).start();
  }
  componentDidUpdate(previousProps) {
    if (previousProps.crypto !== this.props.crypto) {
      this.fetchCryptoData(this.props.crypto);
    }
  }
  render() {
    let { fade } = this.state;
    return (
      <Animated.View style={[styles.leftPanel, { opacity: fade }]}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Crypto Price Statistics</Text>
        </View>
        <View style={{ marginTop: 100 }}>
          <Text style={styles.text}>
            High: <SpanModifierLeft>{this.state.cryptocurrency.high}</SpanModifierLeft>
          </Text>
          <Text style={styles.text}>
            Low: <SpanModifierLeft>{this.state.cryptocurrency.low}</SpanModifierLeft>
          </Text>
          <Text style={styles.text}>
            Open: <SpanModifierLeft>{this.state.cryptocurrency.open}</SpanModifierLeft>
          </Text>
          <Text style={styles.text}>
            Close: <SpanModifierLeft>{this.state.cryptocurrency.close}</SpanModifierLeft>
          </Text>
          <Text style={styles.text}>
            Volume From: <SpanModifierLeft>{this.state.cryptocurrency.volumefrom}</SpanModifierLeft>
          </Text>
          <Text style={styles.text}>
            Volume To: <SpanModifierLeft>{this.state.cryptocurrency.volumeto}</SpanModifierLeft>
          </Text>
        </View>
      </Animated.View>
    );
  }
}
const ConnectedLeftPanel = connect(LeftPanel);

export default ConnectedLeftPanel;
