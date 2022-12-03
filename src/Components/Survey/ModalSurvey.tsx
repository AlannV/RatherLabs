import React, { useState } from "react";
import { Modal, Button, Card } from "antd";
import Survey from "./Survey";
import { surveySample } from "./SurveySample";
import { useSelector } from "react-redux";

// implement a function that returns a modal from Survey.tsx

function SurveyModal() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [buttonAct, setButtonAct] = useState(true);

  const isConnected = useSelector((state: any) => state.isConnected);

  console.log(isConnected);

  return (
    <div className="survey-container">
      {buttonAct === false ? (
        <Button disabled={true}>Start Survey!</Button>
      ) : (
        <>
          <Card style={{ width: 340 }} cover={<img src={surveySample.image} />}>
            <Button
              onClick={() => {
                setIsModalVisible(true);
              }}
            >
              Start Survey!
            </Button>
          </Card>
          <Modal
            width={460}
            title={surveySample.title}
            open={isModalVisible}
            footer={null}
            onCancel={() => {
              setIsModalVisible(false);
            }}
          >
            <Survey />
          </Modal>
        </>
      )}
    </div>
  );
}

export default SurveyModal;
