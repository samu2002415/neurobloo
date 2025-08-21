import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './WritingLevel1.css';
import TruckModelViewer from './TruckModelViewer'; 

function WritingLevel2() {
  const location = useLocation();
  const navigate = useNavigate();
  const username = location.state?.username || 'User';

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [showInstruction, setShowInstruction] = useState(false);
  const [levelComplete, setLevelComplete] = useState(false);

  const goToNextLevel3 = () => {
  navigate('/writing-level-3', { state: { username } });
};

  const instructionText =
    "Trace the word T R U C K. Follow carefully and repeat after me: T...R...U...C...K... TRUCK!";

  // Success sound
  const successSound = new Audio('/assets/success.mp3');

  // Text-to-Speech (TTS)
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
      startSpeechRecognition();
    };

    window.speechSynthesis.speak(message);
  };

  // Speech-to-Text (STT)
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
    setFeedback("🎤 Listening... Please say 'Truck'");

    recognition.onresult = (event) => {
      setIsListening(false);
      const spokenText = event.results[0][0].transcript.toLowerCase();
      console.log("User said:", spokenText);

      if (spokenText.includes("sun")) {
        setFeedback(" Awesome! You said 'Truck' correctly!");
        setLevelComplete(true);
        successSound.play();

        // Auto move to Level 3 after 4 seconds
        setTimeout(() => {
          navigate("/writing-level-3", { state: { username } });
        }, 4000);

      } else {
        setFeedback(` You said '${spokenText}'. Try again!`);
        setLevelComplete(false);
      }
    };

    recognition.onerror = (event) => {
      setIsListening(false);
      setFeedback("Error during recognition: " + event.error);
    };
  };

  // Manual navigation (backup)
  const goToNextLevel = () => {
    navigate("/writing-level-3", { state: { username } });
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
          Level 2 - Trace the Object: <strong>TRUCK</strong>
        </h2>

       
        <TruckModelViewer />

       
        {!isSpeaking && !isListening && !levelComplete && (
          <button className="ar-button" onClick={playInstruction}>
            Start Level 2
          </button>
        )}

       
        {showInstruction && <p className="instruction">{instructionText}</p>}

        
        {feedback && <p className="feedback">{feedback}</p>}

       
       {!levelComplete && feedback.includes("Try again") && (
          <button className="retry-button" onClick={playInstruction}>
             Try Again
          </button>
        )}

        {levelComplete && (
          <button className="next-button" onClick={goToNextLevel3}>
             Go to Level 3
          </button>
        )}
      </main>
    </div>
  );
}

export default WritingLevel2;
