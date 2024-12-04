import React, { useState, useRef } from "react";
import styled, { keyframes } from "styled-components";

const Pronunciation = () => {
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [ttsAudio, setTtsAudio] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [refText, setRefText] = useState("");
  const [offsets, setOffsets] = useState([]);
  const [omittedWords, setOmittedWords] = useState("");
  const [insertedWords, setInsertedWords] = useState("");
  const [permission, setPermission] = useState(false);

  const gumStream = useRef(null);
  const mediaRecorder = useRef(null);

  const startRecording = async () => {
    if (recording) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setPermission(true);
      gumStream.current = stream;

      const recorder = new MediaRecorder(stream);
      mediaRecorder.current = recorder;

      const chunks = [];
      recorder.ondataavailable = (event) => chunks.push(event.data);
      recorder.onstop = () => {
        const audioBlob = new Blob(chunks, { type: "audio/wav" });
        setAudioBlob(audioBlob);
        stopRecording();
      };

      recorder.start();
      setRecording(true);

      setTimeout(() => recorder.stop(), 5000);
    } catch (error) {
      console.error("녹음 시작 오류:", error);
    }
  };

  const stopRecording = () => {
    setRecording(false);
    if (gumStream.current) {
      gumStream.current.getAudioTracks()[0].stop();
    }
  };

  const fetchTTS = async (text) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/gettts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reftext: text }),
      });

      if (!response.ok) {
        throw new Error("TTS 요청 실패");
      }

      const blob = await response.blob();
      const offsets = response.headers.get("offsets").split(",").map(Number);
      console.log("TTS Audio Blob:", blob);
      console.log("Offsets:", offsets);
    } catch (error) {
      console.error("TTS 요청 오류:", error);
    }
  };

  const analyzeRecording = async (audioBlob, refText) => {
    const formData = new FormData();
    formData.append("audio_data", audioBlob); // Flask로 파일 데이터 전송
    formData.append("reftext", refText); // 추가 텍스트 데이터

    try {
      const response = await fetch("http://127.0.0.1:5000/ackaud", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("녹음 분석 요청 실패");
      }

      const data = await response.json();
      console.log("분석 결과:", data);
    } catch (error) {
      console.error("녹음 분석 요청 오류:", error);
    }
  };

  const processMetrics = (words) => {
    const omitted = [];
    const inserted = [];

    words.forEach((word) => {
      if (word.ErrorType === "Omission") {
        omitted.push(word.Word);
      } else if (word.ErrorType === "Insertion") {
        inserted.push(word.Word);
      }
    });

    setOmittedWords(omitted.join(", "));
    setInsertedWords(inserted.join(", "));
  };

  const playAudio = () => {
    if (!ttsAudio) return;
    const audio = new Audio(ttsAudio);
    audio.play();
  };

  return (
    <AppContainer>
      <TtsContainer>
        <ButtonContainer>
          <HearingButton onClick={() => fetchTTS(refText)}>
            <span className="fas fa-headphones"></span>발음 배우기
          </HearingButton>
        </ButtonContainer>
        {ttsAudio && (
          <TtsList>
            <audio controls src={ttsAudio}></audio>
          </TtsList>
        )}
      </TtsContainer>

      <FormContainer>
        <TextAreaForm>
          <TextArea
            value={refText}
            onChange={(e) => setRefText(e.target.value)}
            rows="3"
            maxLength="160"
            placeholder="Enter Reference Text here..."
          />
        </TextAreaForm>
      </FormContainer>

      <ButtonContainer>
        <GreenButton onClick={startRecording}>
          <span className="fa fa-microphone"></span>
          {recording ? "녹음 중..." : "녹음하기"}
        </GreenButton>
        <HearingButton onClick={analyzeRecording} disabled={!audioBlob}>
          분석하기
        </HearingButton>
      </ButtonContainer>

      {metrics && (
        <RecordContainer>
          <Metrics>
            <SummaryTable>
              <table>
                <thead>
                  <tr>
                    <th>정확도</th>
                    <th>유창성</th>
                    <th>완전성</th>
                    <th>운율 점수</th>
                    <th>빠진 단어</th>
                    <th>추가 단어</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{metrics.AccuracyScore}</td>
                    <td>{metrics.FluencyScore}</td>
                    <td>{metrics.CompletenessScore}</td>
                    <td>{metrics.PronScore}</td>
                    <td>{omittedWords || "없음"}</td>
                    <td>{insertedWords || "없음"}</td>
                  </tr>
                </tbody>
              </table>
            </SummaryTable>
          </Metrics>
        </RecordContainer>
      )}

      <Footer>마이크 권한을 허용해주세요.</Footer>
    </AppContainer>
  );
};

export default Pronunciation;

const AppContainer = styled.div`
  padding: 10px 5%;
  background-color: white;
`;

const TtsContainer = styled.div`
  background-color: rgb(237, 245, 245);
  border-radius: 3px;
  margin: 0 auto;
`;

const ButtonContainer = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 20px;
  border-radius: 12px;
`;

const HearingButton = styled.button`
  padding: 13px 28px;
  font-size: 20px;
  font-family: Arial, Helvetica, sans-serif;
  border-radius: 12px;
  color: white;
  background-color: rgb(77, 155, 155);
  border: none;
  cursor: pointer;
  transition: background-color 200ms linear;

  &:hover {
    background-color: rgb(28, 117, 117);
  }

  span {
    margin-right: 10px;
  }
`;

const GreenButton = styled(HearingButton)`
  background-color: #4caf50;

  &:hover {
    background-color: #3e8e41;
  }
`;

const TtsList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TtsLoader = styled.div`
  display: none;
`;

const RecordContainer = styled.div`
  background-color: rgba(172, 255, 47, 0.055);
`;

const RecordingsList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loader = styled.div`
  margin: 0 auto;
  border: 16px solid #f3f3f3;
  border-top: 16px solid #3498db;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: ${keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  `} 2s linear infinite;
`;

const FormContainer = styled.div`
  margin: auto;
`;

const TextAreaForm = styled.form`
  margin-top: 10px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 12px 20px;
  font-size: 30px;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
  border: 2px solid #ccc;
  background-color: #f8f8f8;
  text-align: center;
  box-sizing: border-box;
  resize: none;
`;

const Metrics = styled.div`
  animation: ${keyframes`
    from { bottom: -100px; opacity: 0; }
    to { bottom: 0; opacity: 1; }
  `} 1s forwards;
`;

const SummaryTable = styled.div`
  display: none;
  margin: 5px;
  border-spacing: 5px;

  table,
  th,
  td {
    border: 1px solid lightgrey;
    border-collapse: collapse;
    padding: 5px;
    text-align: center;
  }
`;

const DetailedTable = styled(SummaryTable)`
  overflow-x: auto;
`;

const RecordLoader = styled(TtsLoader)`
  display: none;
`;

const Footer = styled.footer`
  text-align: center;
  font-size: x-small;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: lighter;
`;
