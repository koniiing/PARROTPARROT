import React from "react";
import styled from "styled-components";
const TodayWords = () => {
  const wordData = [
    { word: "밥", rating: 3 },
    { word: "바", rating: 2 },
    { word: "까까", rating: 1 },
    { word: "네", rating: 1 },
  ];
  return (
    <Container>
      <RecommendedWords>
        <WordsTitle>오늘의 추천 단어</WordsTitle>
        <WordList>
          {wordData.map(({ word, rating }, index) => (
            <WordItem key={word}>
              {word} <Rating>{"★".repeat(rating).padEnd(3, "☆")}</Rating>{" "}
            </WordItem>
          ))}
        </WordList>
      </RecommendedWords>
    </Container>
  );
};

export default TodayWords;
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0;
`;

const RecommendedWords = styled.div`
  width: auto;
  max-width: 340px;
  background-color: #ffc107;
  border-radius: 15px;
  padding: 10px 0;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.25);
`;

const WordsTitle = styled.div`
  color: white;
  padding: 10px;
  font-size: 16px;
  text-align: center;
  font-weight: bold;
  font-family: "NanumSquareRound";
`;

const WordList = styled.div`
  font-family: "HakgyoansimNadeuriTTF-B";

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  background-color: #fef3d6;
  padding: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  height: 70px;
`;

const WordItem = styled.div`
  background-color: #ffffff;
  padding-top: 12px;
  border-radius: 8px;
  font-size: 20px;
  display: flex;
  align-items: center;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  font-weight: bold;
  flex-direction: column;
  width: 72px;
  height: 53px;
`;

const Rating = styled.span`
  font-family: "HakgyoansimNadeuriTTF-B";
  font-size: 14px;
  color: #febf1a;
  margin: 6px 0px;
`;
