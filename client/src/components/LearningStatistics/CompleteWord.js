import React from "react";
import styled from "styled-components";
import playImg from "../../assets/images/play.svg";
import reportImg from "../../assets/images/report.svg";
const wordData = [
  { word: "밥", progress: "40%", rating: 3 },
  { word: "바", progress: "90%", rating: 2 },
  { word: "까까", progress: "50%", rating: 1 },
  { word: "네", progress: "70%", rating: 1 },
];

const CompleteWord = () => {
  return (
    <WordList>
      <Title>주간 학습 단어</Title>
      {wordData.map(({ word, progress, rating }, index) => (
        <WordItem key={index}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "8px",
              padding: "8px",
              width: "341px",
            }}
          >
            {" "}
            <div>
              <WordText>{word}</WordText>
              <Rating>{"★".repeat(rating).padEnd(3, "☆")}</Rating>{" "}
            </div>
            <ActionButtons>
              <PlayButton src={playImg} alt="play" />
              <ReportButton src={reportImg} alt="report" />
            </ActionButtons>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <ProgressContainer>
              <ProgressBar width={progress} />
            </ProgressContainer>{" "}
            <Percent>{progress}</Percent>
          </div>
        </WordItem>
      ))}
    </WordList>
  );
};

export default CompleteWord;
const WordList = styled.div`
  font-family: "NanumSquareRound";
  background-color: #fef3d6;
  margin: 0;
`;
const Title = styled.div`
  margin: 18px;
  color: #001c2c;
  font-size: 17px;
  font-style: normal;
  font-weight: 800;
`;
const Rating = styled.span`
  font-family: "HakgyoansimNadeuriTTF-B";
  font-size: 14px;
  color: #febf1a;
  margin: 4px 0;
`;

const WordItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 8px;
  padding: 8px;
  width: 341px;
`;

const WordText = styled.div`
  font-family: "HakgyoansimNadeuriTTF-B";
  font-size: 28px;
  font-style: normal;
  font-weight: 600;
`;

const ProgressContainer = styled.div`
  background-color: #e0e0e0;
  border-radius: 4px;
  height: 8px;
  margin: 0 8px;
  width: 100%; /* Set width to fit the layout */
  overflow: hidden;
`;

const ProgressBar = styled.div`
  background-color: #ffc107;
  width: ${(props) => props.width};
  height: 100%;
  border-radius: 4px;
`;

const PlayButton = styled.img`
  width: 32px;
  height: 32px;
  cursor: pointer;
`;

const ReportButton = styled.img`
  width: 36px;
  height: 36px;
  cursor: pointer;
`;
const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
`;
const Percent = styled.div`
  color: #001c2c;
  font-family: NanumSquareRound;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
`;
