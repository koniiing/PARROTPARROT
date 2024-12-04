import React from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import Menu from "../common/menu";
const WordList = () => {
  const navigate = useNavigate();

  const words = [
    { text: "밥", date: "2024.10.27", progress: 80, rating: 3 },
    { text: "야", date: "2024.10.23", progress: 75, rating: 1 },
    { text: "나", date: "2024.10.23", progress: 50, rating: 2 },
    { text: "네", date: "2024.10.22", progress: 30, rating: 3 },
    { text: "까까", date: "2024.10.22", progress: 50, rating: 1 },
    { text: "가", date: "2024.10.22", progress: 10, rating: 1 },
    { text: "아니", date: "2024.10.22", progress: 30, rating: 2 },
    { text: "좋아", date: "2024.10.22", progress: 10, rating: 1 },
    { text: "아파", date: "2024.10.22", progress: 70, rating: 2 },
    { text: "바", date: "2024.10.22", progress: 90, rating: 1 },
  ];

  return (
    <WordContainer>
      <Header>목표 단어</Header>
      <SearchWrapper>
        <SearchBar>
          {/* <FaSearch /> */}
          <input type="text" placeholder="연습할 단어를 입력하세요." />
        </SearchBar>
        <SortButton>최근 학습순 ▼</SortButton>
      </SearchWrapper>
      <WordGrid>
        {words.map((word, index) => (
          <WordCard
            key={index}
            onClick={() => navigate("/detailword")}
            //          onClick={() => window.location.href = "http://127.0.0.1:5000/"}
          >
            <WordText>{word.text}</WordText>{" "}
            <Rating>{"★".repeat(word.rating).padEnd(3, "☆")}</Rating>
            <ProgressBar>
              <Progress
                style={{ width: `${word.progress}%` }}
                progress={word.progress}
              />
            </ProgressBar>
            <LastStudied>마지막 학습일: {word.date || "-"}</LastStudied>
          </WordCard>
        ))}
      </WordGrid>
      <Menu />
    </WordContainer>
  );
};

export default WordList;
const WordContainer = styled.div`
  background-color: #fef3d6;
  margin: 0;
  height: 100vh;
  font-family: "NanumSquareRound";
  padding: 0px;
`;
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: start;
  width: 100%;
  padding: 15px;
  background-color: #febf1a;
  font-size: 20px;
  color: #ffffff;
  font-family: NanumSquareRound;
  font-style: normal;
  font-weight: 800;
`;
const SearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin: 16px auto 0px;
  max-width: 341px;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  width: 341px;
  height: 39px;

  input {
    border: none;
    outline: none;
    background: none;
    margin-left: 8px;
    width: 100%;
    font-size: 14px;
    color: #666;
    font-family: "NanumSquareRound";
  }
`;

const SortButton = styled.button`
  background-color: #eeac00;
  color: #ffffff;
  border: none;
  border-radius: 15px;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  width: 108px;
  height: 24px;
  text-align: center;
  font-family: "NanumSquareRound";
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.15);
  margin: 10px 20px;
`;

const WordGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  padding: 16px;
  max-width: 350px;
  margin: 0 auto;
`;

const WordCard = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  padding: 6px;
  text-align: center;
  width: 160px;
  height: auto;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const WordText = styled.div`
  font-family: "HakgyoansimNadeuriTTF-B";
  font-size: 28px;
  font-weight: bold;
  margin: 5px auto 8px;
  color: #333;
`;

const Rating = styled.span`
  font-family: "HakgyoansimNadeuriTTF-B";

  font-size: 14px;
  color: #febf1a;
  position: absolute;
  top: 7px;
  right: 10px;
`;

const ProgressBar = styled.div`
  background-color: #e0e0e0;
  border-radius: 6px;
  height: 8px;
  overflow: hidden;
  margin: 10px 0;
`;

const Progress = styled.div`
  background-color: ${(props) => (props.progress < 70 ? "#FFA600" : "#03CA5B")};
  height: 100%;
  width: ${(props) => props.progress}%;
  border-radius: 6px;
`;

const LastStudied = styled.div`
  font-size: 8px;
  color: #000;
  font-family: "NanumSquareRound";
  text-align: start;
`;
