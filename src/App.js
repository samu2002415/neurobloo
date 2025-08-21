import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './components/WelcomeScreen';
import LearningHomePage from './components/LearningHomePage';
import ProgressTracker from './components/ProgressTracker';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import ProfilePage from './components/ProfilePage';
import ReadingAdventurePage from'./components/ReadingAdventurePage';
import MathAdventurePage from'./components/MathAdventurePage';
import WritingAdventurePage from './components/WritingAdventurePage';
import SettingPage from './components/SettingPage';
import WritingLevel1 from './components/WritingLevel1';
import WritingLevel2 from './components/WritingLevel2';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
         <Route path="/home" element={<LearningHomePage />} />
         <Route path="/progress-tracker" element={<ProgressTracker />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/reading" element={<ReadingAdventurePage />} />
          <Route path="/Math" element={<MathAdventurePage />} />
          <Route path="/Writing" element={<WritingAdventurePage />} />
            <Route path="/Setting" element={<SettingPage />} />
            <Route path="/writing-level-1" element={<WritingLevel1 />} />
            <Route path='/writing-level-2' element={<WritingLevel2/>}/>

          </Routes>
    </Router>
  );
}


export default App;
