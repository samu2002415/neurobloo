import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './WritingLevel1.css';
import CatModelViewer from './CatModelViewer';

function WritingLevel1() {
  const location = useLocation();
  const navigate = useNavigate();
  const username = location.state?.username || 'User';

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [showInstruction, setShowInstruction] = useState(false);
  const [levelComplete, setLevelComplete] = useState(false);

  const goToNextLevel2 = () => {
  navigate('/writing-level-2', { state: { username } });
};

  const instructionText =
    "Trace the word C A T. Follow carefully and repeat after me: C... A... T... Cat!";

     const successSound = new Audio('/assets/success.wav');

  //  Text-to-Speech (TTS)
  const playInstruction = () => {
    const message = new SpeechSynthesisUtterance(instructionText);
    message.lang = "en-US";
    message.rate = 0.9;
    message.pitch = 1.2;

    message.onstart = () => {
      setIsSpeaking(true);
      setFeedback('');
      setShowInstruction(true);
    };
    message.onend = () => {
      setIsSpeaking(false);
      startSpeechRecognition(); //  Start listening after speaking
    };

    window.speechSynthesis.speak(message);
  };

  //  Speech-to-Text (STT)
  const startSpeechRecognition = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in this browser. Try Chrome.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();
    setIsListening(true);
    setFeedback("🎤 Listening... Please say 'Cat'");

    recognition.onresult = (event) => {
      setIsListening(false);
      const spokenText = event.results[0][0].transcript.toLowerCase();
      console.log("User said:", spokenText);

      if (spokenText.includes("cat")) {
        setFeedback(" Great job! You said 'Cat' correctly!");
        setLevelComplete(true);
          successSound.play();
      } else {
        setFeedback(`You said '${spokenText}'. Try again!`);
        setLevelComplete(false);
      }
    };

    recognition.onerror = (event) => {
      setIsListening(false);
      setFeedback("⚠️ Error during recognition: " + event.error);
    };
  };

  // ✅ Handle Next Level Navigation
  const goToNextLevel = () => {
    navigate("/writing-level-2", { state: { username } });
  };

  return (
    <div className="reading-container">
      <header className="reading-header">
        <nav className="nav-links">
          <a href="/home">Home</a>
          <a href="/profile">Profile</a>
          <a href="/progress-tracker">Progress Tracker</a>
          <a href="/setting">Setting</a>
        </nav>
      </header>

      <main className="reading-main">
        <h2 className="reading-title">
          Level 1 - Trace the Object: <strong>CAT</strong>
        </h2>

        {/* 3D Cat Model */}
        <CatModelViewer />

        {/* Start Button */}
        {!isSpeaking && !isListening && !levelComplete && (
          <button className="ar-button" onClick={playInstruction}>
            Start Level 1
          </button>
        )}

        {/*  Show instruction text */}
        {showInstruction && <p className="instruction">{instructionText}</p>}

        {/* Feedback */}
        {feedback && <p className="feedback">{feedback}</p>}

        {/* Try Again Button (fix: always shows when wrong) */}
        {!levelComplete && feedback.includes("Try again") && (
          <button className="retry-button" onClick={playInstruction}>
             Try Again
          </button>
        )}

        {/*  Next Level Button */}
        {levelComplete && (
          <button className="next-button" onClick={goToNextLevel2}>
            Go to Level 2
          </button>
        )}
      </main>
    </div>
  );
}

export default WritingLevel1;
