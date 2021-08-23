import React from "react";
import { StyleSheet } from "react-360";

const styles = StyleSheet.create({
  leftPanel: {
    padding: 10,
    width: 300,
    height: 600,
    borderWidth: 10,
    backgroundColor: "#00171f",
    borderColor: "#003459",
    flexDirection: "column",
  },
  rightPanel: {
    padding: 10,
    width: 300,
    height: 600,
    borderWidth: 10,
    backgroundColor: "#00171f",
    borderColor: "#003459",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  header: {
    backgroundColor: "#003459",
  },
  headerText: {
    fontSize: 27,
    textAlign: "center",
    fontWeight: "bold",
  },
  text: {
    fontSize: 23,
    textAlign: "center",
  },
  infoHeader: {
    textAlign: "center",
    fontWeight: "bold",
  },

  button: {
    height: 60,
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#0eb1d2",
    borderColor: "#fff",
    borderWidth: 2.5,
  },
  hover: {
    height: 60,
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#0073b7",
    borderColor: "#fff",
    borderWidth: 2.5,
  },
});

export default styles;
