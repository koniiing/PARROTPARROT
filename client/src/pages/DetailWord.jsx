import React, { useState, useRef } from "react";
import styled from "styled-components";
import Recorder from "recorder-js"; // Ensure you have imported Recorder.js
import img from "../assets/images/ricebowl.svg";
import arrowR from "../assets/images/rightarrow.png";
import arrowL from "../assets/images/leftarrow.svg";
import Table from "../components/DetailWord/Table";
import { useLocation, useNavigate } from "react-router-dom";
import SpeechProcessor from "../components/DetailWord/SpeechProcessor";
const DetailWord = () => {
  const [progress, setProgress] = useState(0);
  const [recording, setRecording] = useState(false);
  const [message, setMessage] = useState("");
  const [pronScore, setPronScore] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const audioContext = useRef(null);
  const gumStream = useRef(null);
  const recorder = useRef(null);
  const navigate = useNavigate();
  const [text, setText] = useState("밥"); // 기본 텍스트를 "밥"으로 설정
  const handleRecord = async () => {
    if (!recording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        audioContext.current = new (window.AudioContext ||
          window.webkitAudioContext)();
        gumStream.current = stream;

        // Correctly initialize recorder-js
        recorder.current = new Recorder(audioContext.current);
        recorder.current.init(stream);

        // Start recording
        await recorder.current.start();
        setRecording(true);
        setMessage("녹음 중...");
      } catch (err) {
        console.error("Microphone access denied:", err);
        setMessage("마이크에 접근할 수 없습니다.");
      }
    } else {
      // Stop recording
      const { blob } = await recorder.current.stop();
      gumStream.current.getAudioTracks()[0].stop();

      setRecording(false);
      setMessage("녹음 종료, 점수 계산 중...");
      await calculatePronScore(blob);
    }
  };

  const calculatePronScore = async (blob) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("audio_data", blob);
      formData.append("reftext", "밥"); // Replace with dynamic reference text if needed

      const response = await fetch("/gettts", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setPronScore(data.PronScore);
      setProgress(data.PronScore); // Update the progress bar with the score
      setMessage("발음 점수가 업데이트되었습니다!");
    } catch (err) {
      console.error("Error calculating pronunciation score:", err);
      setMessage("점수 계산에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate("/wordlist")}>←</BackButton>
        <Title>밥</Title>
      </Header>
      <Content>
        <ImageWrapper>
          <Arrow src={arrowL} />
          <FoodImage src={img} alt="Rice Bowl" />
          <Arrow src={arrowR} />
        </ImageWrapper>
        <ProgressContainer>
          <ProgressBar progress={progress} />
          <ProgressText>발음 점수: {progress}%</ProgressText>
        </ProgressContainer>
        <RecordingArea>
          {recording ? (
            <Waveform>🎤</Waveform>
          ) : (
            <PromptText>소리를 듣고 따라해볼까요?</PromptText>
          )}
          <RetryMessage>{message}</RetryMessage>
        </RecordingArea>
        <Button onClick={handleRecord}>
          {recording ? <StopIcon>■</StopIcon> : <RecordIcon>●</RecordIcon>}
        </Button>
        <SpeechProcessor />
      </Content>
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
`;

const Arrow = styled.img`
  font-size: 24px;
  margin: 0 16px;
  cursor: pointer;
`;

const FoodImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 8px;
  margin: 20px;
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
