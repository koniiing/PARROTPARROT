import React, { useState, useRef } from "react";
import styled from "styled-components";
import Recorder from "recorder-js"; // Ensure you have imported Recorder.js

const Table = () => {
  const [refText, setRefText] = useState("");
  const [message, setMessage] = useState("");

  const [progress, setProgress] = useState(0);
  const [recording, setRecording] = useState(false);
  const [pronScore, setPronScore] = useState(null);
  const [metrics, setMetrics] = useState({});
  const [audioUrl, setAudioUrl] = useState(null);
  const [wordOffsets, setWordOffsets] = useState([]);
  const [wordAudioUrls, setWordAudioUrls] = useState([]);
  const [loading, setLoading] = useState(false);

  const audioContext = useRef(null);
  const recorder = useRef(null);
  const gumStream = useRef(null);

  const handleRefTextChange = (e) => {
    setRefText(e.target.value);
  };

  const handleTTS = async () => {
    try {
      const formData = new FormData();
      formData.append("reftext", refText);

      const response = await fetch("/gettts", {
        method: "POST",
        responseType: "blob",
      });

      const audioBlob = await response.blob();
      const offsets = response.headers.get("offsets");
      setWordOffsets(
        offsets
          ? offsets
              .slice(1, -1)
              .split(",")
              .map((val) => parseFloat(val))
          : []
      );

      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
    } catch (err) {
      console.error("Error generating TTS:", err);
    }
  };

  const playWord = (index) => {
    if (!audioUrl || wordOffsets.length === 0) return;

    const audio = new Audio(audioUrl);
    audio.playbackRate = 0.5;
    audio.currentTime = wordOffsets[index] / 1000;

    const stopAfter =
      index < wordOffsets.length - 1
        ? wordOffsets[index + 1] / 1000
        : audio.duration;

    audio.ontimeupdate = () => {
      if (audio.currentTime >= stopAfter) {
        audio.pause();
        audio.currentTime = 0;
      }
    };

    audio.play();
  };

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

  const handlePronScore = async (blob) => {
    try {
      const formData = new FormData();
      formData.append("audio_data", blob);
      formData.append("reftext", refText);

      const response = await fetch("/ackaud", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.RecognitionStatus === "Success") {
        setMetrics(data.NBest[0]);
        setPronScore(data.NBest[0].PronScore);
      } else {
        console.error("Error in recognition:", data.RecognitionStatus);
      }
    } catch (err) {
      console.error("Error calculating pronunciation score:", err);
    }
  };

  const getTongueTwister = async () => {
    try {
      const response = await fetch("/gettonguetwister", { method: "POST" });
      const data = await response.json();
      setRefText(data.tt);
    } catch (err) {
      console.error("Error fetching tongue twister:", err);
    }
  };

  return (
    <Container>
      <Header>Pronunciation Practice</Header>
      <TextArea
        value={refText}
        onChange={handleRefTextChange}
        placeholder="Enter reference text or fetch a random tongue twister"
      />
      <Button onClick={getTongueTwister}>Fetch Tongue Twister</Button>
      <Button onClick={handleTTS} disabled={!refText}>
        Generate TTS
      </Button>
      {audioUrl && (
        <AudioPlayer controls>
          <source src={audioUrl} type="audio/wav" />
        </AudioPlayer>
      )}
      <Button onClick={handleRecord}>
        {recording ? "Stop Recording" : "Start Recording"}
      </Button>
      <Metrics>
        <h3>Metrics:</h3>
        <p>Accuracy: {metrics.AccuracyScore}</p>
        <p>Fluency: {metrics.FluencyScore}</p>
        <p>Completeness: {metrics.CompletenessScore}</p>
        <p>Pronunciation: {metrics.PronScore}</p>
      </Metrics>
    </Container>
  );
};

export default Table;

// Styled Components
const Container = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
`;

const Header = styled.h1`
  text-align: center;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 80px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  display: block;
  margin: 10px 0;
`;

const AudioPlayer = styled.audio`
  width: 100%;
  margin-top: 10px;
`;

const Metrics = styled.div`
  margin-top: 20px;
`;
