import React from "react";

import { installComprobation } from "../../Redux/Actions/index";
import ConnectionError from "./ConnectionError";
import WalletCard from "../MetaMask/WalletCard";

import ModalSurvey from "../Survey/ModalSurvey";
import Card from "antd/es/card/Card";

function Main() {
  return !installComprobation() ? (
    <Card style={{ width: "50%" }}>
      <ConnectionError />
    </Card>
  ) : (
    <div>
      <WalletCard />
      <ModalSurvey />
    </div>
  );
}

export default Main;
