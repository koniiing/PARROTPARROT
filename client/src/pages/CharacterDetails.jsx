import React from "react";
import Menu from "../common/menu";
import detailcharacter from "../assets/images/detailc.svg";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const CharacterDetails = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Image src={detailcharacter} onClick={() => navigate("/character")} />
      <Menu />
    </div>
  );
};

export default CharacterDetails;
const Image = styled.img``;
