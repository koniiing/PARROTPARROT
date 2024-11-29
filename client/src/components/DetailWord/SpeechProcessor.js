import React, { useState } from "react";
import * as SpeechSDK from "microsoft-cognitiveservices-speech-sdk";

const SpeechProcessor = () => {
  const [text, setText] = useState("밥"); // 기본 텍스트 설정
  const [audioUrl, setAudioUrl] = useState(null);
  const [result, setResult] = useState(null);

  // Azure Subscription Key와 Region 설정
  const subscriptionKey = process.env.REACT_APP_API_KEY; // Azure Portal에서 제공받은 API 키
  const region = "koreacentral"; // Azure에서 Speech Service가 설정된 지역

  // Text-to-Speech (TTS) 구현
  const handleTTS = async () => {
    const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(
      subscriptionKey,
      region
    );
    speechConfig.speechSynthesisVoiceName = "ko-KR-SunHiNeural"; // 한국어 음성 설정

    const audioConfig = SpeechSDK.AudioConfig.fromDefaultSpeakerOutput();
    const synthesizer = new SpeechSDK.SpeechSynthesizer(
      speechConfig,
      audioConfig
    );

    synthesizer.speakTextAsync(
      text,
      (result) => {
        if (
          result.reason === SpeechSDK.ResultReason.SynthesizingAudioCompleted
        ) {
          console.log("음성 생성 완료");
        } else {
          console.error("TTS 실패:", result.errorDetails);
        }
        synthesizer.close();
      },
      (error) => {
        console.error("TTS 오류:", error);
        synthesizer.close();
      }
    );
  };

  // 음성 평가 구현
  const handlePronunciationAssessment = async (audioBlob) => {
    const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(
      subscriptionKey,
      region
    );

    // Pronunciation Assessment 설정
    const pronunciationConfig =
      SpeechSDK.PronunciationAssessmentConfig.fromJSON({
        ReferenceText: text,
        GradingSystem: "HundredMark",
        Dimension: "Comprehensive",
        EnableMiscue: true,
      });
    pronunciationConfig.applyTo(speechConfig);

    const audioConfig = SpeechSDK.AudioConfig.fromWavFileInput(audioBlob);
    const recognizer = new SpeechSDK.SpeechRecognizer(
      speechConfig,
      audioConfig
    );

    recognizer.recognizeOnceAsync((result) => {
      if (result.reason === SpeechSDK.ResultReason.RecognizedSpeech) {
        const jsonResult = JSON.parse(
          result.properties.getProperty(
            SpeechSDK.PropertyId.SpeechServiceResponse_JsonResult
          )
        );
        console.log("분석 결과:", jsonResult);
        setResult(jsonResult);
      } else {
        console.error("음성 인식 실패:", result.errorDetails);
      }
      recognizer.close();
    });
  };

  // 녹음 기능
  const handleRecord = () => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      const chunks = [];

      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(chunks, { type: "audio/wav" });
        setAudioUrl(URL.createObjectURL(audioBlob)); // 오디오 URL 설정
        handlePronunciationAssessment(audioBlob); // 녹음된 오디오 평가
      };

      mediaRecorder.start();

      setTimeout(() => {
        mediaRecorder.stop();
      }, 7000); // 7초 동안 녹음
    });
  };

  return (
    <div>
      <h1>Speech Processor</h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="텍스트를 입력하세요"
      />
      <button onClick={handleTTS}>TTS 실행</button>
      <button onClick={handleRecord}>녹음 시작</button>
      {audioUrl && (
        <div>
          <audio src={audioUrl} controls />
        </div>
      )}
      {result && (
        <div>
          <h2>평가 결과</h2>
          <p>정확도: {result.NBest[0].AccuracyScore}</p>
          <p>유창성: {result.NBest[0].FluencyScore}</p>
          <p>완전성: {result.NBest[0].CompletenessScore}</p>
          <p>운율 점수: {result.NBest[0].PronScore}</p>
        </div>
      )}
    </div>
  );
};

export default SpeechProcessor;
