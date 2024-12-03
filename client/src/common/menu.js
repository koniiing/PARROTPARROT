import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import home from "../assets/images/home.svg";
import graph from "../assets/images/graph.svg";
import bird from "../assets/images/bird.svg";
import file from "../assets/images/file.svg";

const Menu = () => {
  const location = useLocation();

  return (
    <MenuWrapper>
      <MenuItem to="/" className={location.pathname === "/" ? "active" : ""}>
        <Icon src={home} alt="홈" />홈
      </MenuItem>
      <MenuItem
        to="/wordList"
        className={location.pathname === "/wordList" ? "active" : ""}
      >
        <Icon src={file} alt="단어장" />
        단어장
      </MenuItem>
      <MenuItem
        to="/statistics"
        className={location.pathname === "/statistics" ? "active" : ""}
      >
        <Icon src={graph} alt="학습기록" />
        학습기록
      </MenuItem>
      <MenuItem
        to="/character"
        className={location.pathname === "/character" ? "active" : ""}
      >
        <Icon src={bird} alt="캐릭터" />
        캐릭터
      </MenuItem>
    </MenuWrapper>
  );
};

export default Menu;

const MenuWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 375px;
  height: 57px;
  background-color: #febf1a;
  display: flex;
  align-items: center;
  z-index: 1000;
  gap: 50px;
  padding: 15px 42px 14px 42px;
`;
const Icon = styled.img`
  width: 24px;
  height: 24px;
  margin-bottom: 4px;
`;
const MenuItem = styled(Link)`
  background: none;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: NanumSquareRoundOTF;
  font-size: 12px;
  cursor: pointer;
  text-decoration: none;
  color: #ffdf8c;
  letter-spacing: -0.391px;

  &.active {
    color: #ffffff;

    ${Icon} {
      opacity: 1;
    }
  }

  &:not(.active) ${Icon} {
    opacity: 0.6;
  }
`;
