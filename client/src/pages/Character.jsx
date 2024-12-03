import React from "react";
import Menu from "../common/menu";
import img from "../assets/images/c.svg";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
const Character = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Image src={img} onClick={() => navigate("/detailcharacter")} />
      <Menu />
    </div>
  );
};

export default Character;

const Image = styled.img``;
