import React from "react";
import { asset, NativeModules, Text, View, Animated, VrButton } from "react-360";
import { connect, nextCrypto } from "../../store";
import SpanModifierRight from "./SpanModifierRight";
import styles from "./stylesheet.js";

const { AudioModule } = NativeModules;
class RightPanel extends React.Component {
  state = {
    cryptoData: {
      symbol: "",
      algorithm: "",
      proofType: "",
      blockNumber: "",
      blockTime: "",
      blockReward: "",
    },
    fade: new Animated.Value(0),
    hover: false,
  };

  fetchCryptoData(crypto) {
    fetch(`https://min-api.cryptocompare.com/data/coin/generalinfo?fsyms=${crypto}&tsym=USD&api_key=1bd@917187334c260db80edbb0de4ee5e9681018a169a05d4b918a9d6027730f1baa3604f7157877b79bc0df`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          cryptoData: {
            symbol: data.Data[0].CoinInfo.Name,
            algorithm: data.Data[0].CoinInfo.Algorithm,
            proofType: data.Data[0].CoinInfo.ProofType,
            blockNumber: data.Data[0].CoinInfo.BlockNumber,
            blockTime: data.Data[0].CoinInfo.BlockTime,
            blockReward: data.Data[0].CoinInfo.BlockReward,
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
  handleClick = (index) => {
    nextCrypto(index);

    AudioModule.playOneShot({ source: asset("audio/click.wav"), volume: 0.1 });
  };
  render() {
    let { fade } = this.state;
    return (
      <Animated.View style={[styles.rightPanel, { opacity: fade }]}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Crypto Information</Text>
        </View>
        <View>
          <Text style={styles.text}>
            Symbol: <SpanModifierRight>{this.state.cryptoData.symbol}</SpanModifierRight>
          </Text>
          <Text style={styles.text}>
            Algorithm: <SpanModifierRight>{this.state.cryptoData.algorithm}</SpanModifierRight>
          </Text>
          <Text style={styles.text}>
            Proof Type: <SpanModifierRight> {this.state.cryptoData.proofType}</SpanModifierRight>
          </Text>
          <Text style={styles.text}>
            Block Number: <SpanModifierRight>{this.state.cryptoData.blockNumber}</SpanModifierRight>
          </Text>
          <Text style={styles.text}>
            Block Time: <SpanModifierRight>{this.state.cryptoData.blockTime}</SpanModifierRight>
          </Text>
          <Text style={styles.text}>
            Block Reward: <SpanModifierRight>{this.state.cryptoData.blockReward}</SpanModifierRight>
          </Text>
        </View>
        <View>
          <VrButton style={this.state.hover ? styles.hover : styles.button} onEnter={() => this.setState({ hover: true })} onExit={() => this.setState({ hover: false })} onClick={() => this.handleClick(this.props.index)}>
            <Text style={styles.text}>Next Crypto</Text>
          </VrButton>
        </View>
      </Animated.View>
    );
  }
}

const ConnectedRightPanel = connect(RightPanel);

export default ConnectedRightPanel;

// https://surge.sh/help/integrating-with-circleci - to set env variable on surge.sh with CircleCI
