import React, { useState, useRef } from "react";
import styled from "styled-components";
import Recorder from "recorder-js"; // Ensure you have imported Recorder.js
import img from "../assets/images/ricebowl.svg";
import img2 from "../assets/images/video.mp4";
import img3 from "../assets/images/bob_real.mp4";
import soundplay from "../assets/images/soundplay.svg";
import videoplay from "../assets/images/videoplay.svg";
import test1 from "../assets/images/test1.svg";
import test2 from "../assets/images/test2.svg";
import test3 from "../assets/images/test3.svg";
import test4 from "../assets/images/test4.svg";
import test5 from "../assets/images/test5.svg";
import congrat from "../assets/images/congrat.svg";

import arrowR from "../assets/images/rightarrow.png";
import arrowL from "../assets/images/leftarrow.svg";
import Table from "../components/DetailWord/Table";
import sound from "../assets/sound.mp3";
import { useLocation, useNavigate } from "react-router-dom";
import Pronunciation from "../components/DetailWord/Pronunciation";
const DetailWord = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentTestImage, setCurrentTestImage] = useState(0);
  const navigate = useNavigate();
  const audioRef = useRef(new Audio(sound));
  const videoRef = useRef(null);
  const [showFullscreenImage, setShowFullscreenImage] = useState(false);
  const images = [
    { type: "image", src: img, text: "그림 이미지" },
    { type: "video", src: img3, text: "영상" },
    { type: "video", src: img2, text: "3d" },
  ];

  const testImages = [test1, test2, test3, test4, test5];

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => {
      if (prevIndex === 2) {
        return 0;
      } else {
        return prevIndex + 1;
      }
    });
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) => {
      if (prevIndex === 0) {
        return 2;
      } else {
        return prevIndex - 1;
      }
    });
  };
  const handleNextTestImage = () => {
    if (currentTestImage < testImages.length - 1) {
      setCurrentTestImage((prevIndex) => prevIndex + 1);
    }
    if (currentTestImage === testImages.length - 1) {
      setTimeout(() => {
        setShowFullscreenImage(true);
      }, 400); // 800ms delay before showing fullscreen image
    }
  };

  const handlePlay = () => {
    if (currentImageIndex === 0) {
      console.log("Play sound");
      if (audioRef.current.paused) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    } else {
      console.log("Play video");
      // Video play logic here
    }
  };

  return (
    <Container>
      {!showFullscreenImage ? (
        <>
          <Header>
            <BackButton onClick={() => navigate("/wordlist")}>←</BackButton>
            <Title>밥</Title>
          </Header>
          <Content>
            <ImageWrapper>
              <Arrow src={arrowL} onClick={handlePreviousImage} />
              {images[currentImageIndex].type === "image" ? (
                <Image src={images[currentImageIndex].src} />
              ) : (
                <Video controls>
                  <source
                    src={images[currentImageIndex].src}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </Video>
              )}
              <Arrow src={arrowR} onClick={handleNextImage} />
              <PlayButton
                src={currentImageIndex === 0 ? soundplay : videoplay}
                alt={currentImageIndex === 0 ? "Sound Play" : "Video Play"}
                onClick={handlePlay}
              />
            </ImageWrapper>
            <TestWrapper>
              <TestSection
                src={testImages[currentTestImage]}
                onClick={handleNextTestImage}
              />
            </TestWrapper>
          </Content>
        </>
      ) : (
        <FullscreenImage
          src={congrat}
          alt="Fullscreen Image"
          onClick={() => navigate("/wordlist")}
        />
      )}
      <Pronunciation />
    </Container>
  );
};

export default DetailWord;

const Container = styled.div`
  font-family: "NanumSquareRound";
  background-color: #fff7e6;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const FullscreenImage = styled.img`
  width: 100vw;
  height: 100vh;
  object-fit: contain;
`;

const Header = styled.header`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: 8px 16px;
  background-color: #ffc107;
  color: #fff;
  font-size: 18px;
`;
const TestWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 16px;
`;

const TestSection = styled.img``;

const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  color: #fff;
  cursor: pointer;
`;

const Title = styled.h1`
  font-size: 28px;
  display: flex;
  color: #fff;
  text-align: center;
  font-family: "HakgyoansimNadeuriTTF-B";
  margin: 0px 0px 0px 130px;
  font-weight: 600;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 16px;
`;
const AudioPlayer = styled.audio`
  width: 100%;
  margin-top: 10px;
`;

const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  width: 341px;
  height: 341px;
  border-radius: 10px;
  background: #fff;
  position: relative;
`;

const Arrow = styled.img`
  font-size: 24px;
  margin: 0 16px;
  cursor: pointer;
`;

const Image = styled.img`
  width: 180px;
  height: 180px;
  border-radius: 8px;
  margin: 20px;
`;
const Video = styled.video`
  width: 180px;
  height: 180px;
  border-radius: 8px;
  margin: 20px;
`;
const PlayButton = styled.img`
  width: 40px;
  height: 40px;
  position: absolute;
  bottom: 16px;
  right: 16px;
`;

const ProgressContainer = styled.div`
  width: 100%;
  margin: 16px 0;
  text-align: center;
`;

const ProgressBar = styled.div`
  width: ${(props) => props.progress}%;
  height: 8px;
  background-color: #ffc107;
  border-radius: 4px;
  transition: width 0.5s ease-in-out;
`;

const ProgressText = styled.p`
  margin: 8px 0;
  font-size: 14px;
`;

const RecordingArea = styled.div`
  margin-top: 16px;
  text-align: center;
  display: flex;
  width: 341px;
  height: 144px;
  flex-direction: column;
  justify-content: center;
  background: #fff;
  border-radius: 10px;
`;

const PromptText = styled.p`
  font-size: 16px;
  color: #666;
  color: #dbdbdb;
`;

const RetryMessage = styled.p`
  margin-top: 8px;
  color: #e74c3c;
  font-size: 14px;
`;

const Waveform = styled.div`
  font-size: 48px;
  color: #ffc107;
`;

const Button = styled.button`
  background-color: #ffc107;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 52px;
  height: 52px;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
  cursor: pointer;
`;

const RecordIcon = styled.span`
  font-size: 30px;
`;

const StopIcon = styled.span`
  font-size: 30px;
`;
