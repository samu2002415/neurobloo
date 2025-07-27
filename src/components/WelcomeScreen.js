import React from 'react';
import { Link } from 'react-router-dom';

import './WelcomeScreen.css';

function WelcomePage() {
  return (
    <div className="welcome-page">
        {/* 🔷 Navigation Bar */}
        
      <header className="navbar">
        
        <nav className="nav-right">
         <Link to="/login" className="nav-link">Login</Link>
          <Link to="/signup" className="nav-link">Sign Up</Link>
        </nav>
      </header>
      {/* Section 1 - Hero */}
      <section className="hero-section">
        <img src="/assets/Logo.png" alt="Logo" className="logo" />
        <h1 className="title">Neuro<span>Bloom</span></h1>

        <img src="/assets/pngegg (3).png" alt="Kids" className="kids-banner" />

        
      </section>

      {/* Section 2 - Get Started */}
      <section className="info-section">
        <div className="info-card">
         {/* <img src="/assets/book-character.png" alt="Character" className="info-image" />*/}
          <div className="info-text">
            <h2>NeuroBloom</h2>
            <p>
              <b>NeuroBloom </b>helps identify learning differences like dysgraphia, dyscalculia, and dyslexia
              through accessible screening tools and insights—empowering early support and personalized growth.
              NeuroBloom is an innovative web-based educational platform designed to support children with learning disabilities such as <b>dyslexia, dyscalculia,</b> and<b> dysgraphia</b>. By combining <b>Augmented Reality</b> <b>(</b>AR<b>)</b>with interactive learning tools, NeuroBloom makes reading, writing, and math more accessible and engaging. The platform provides personalized learning experiences through gamified activities, speech-to-text features, and 3D guidance for letter and number formation. NeuroBloom is designed for students, parents, and educators to collaboratively support individual learning needs. With real-time progress tracking and a user-friendly interface, it empowers learners to build confidence while helping parents and teachers monitor and guide their progress effectively.


            </p>

            <button className="start-btn"><a href="/login">Get Started</a></button>
          </div>
        </div>

        <div className="learning-options">
          <div className="option-card">
            <img src="/assets/dysgrapia.jpg" alt="Dysgraphia" />
            <h3>Dysgraphia</h3>
            <p>Like dyslexia, dysgraphia is a learning disability that impacts a variety of potential difficulties with writing, including spelling, grammar and punctuation.“Symptoms of dysgraphia include difficulties with visual motor skills (eye-hand coordination) necessary for writing, difficulty recalling how to spell sight words and difficulty accurately sounding out and spelling unfamiliar words,”</p>
          </div>
          <div className="option-card">
            <img src="/assets/dyscalculia.jpg" alt="Dyscalculia" />
            <h3>Dyscalculia</h3>
            <p>Dyscalculia is a learning disability related to math skills.“Much like dyslexia and dysgraphia, dyscalculia describes an impairment in aspects of the brain-based processes necessary for math,”Children with dyscalculia may struggle with number sense, which involves understanding quantities and numerical relationships. They might struggle with basic arithmetic operations, such as addition, subtraction, multiplication and division. 
Concepts like time, money and measurement can also pose challenges for individuals with dyscalculia. </p>
          </div>
          <div className="option-card">
            <img src="/assets/dyslexia1.jpg" alt="Dyslexia" />
            <h3>Dyslexia</h3>
            <p>Dyslexia is the most common learning disability.Children with dyslexia often struggle with decoding words, recognizing letters and their sounds and comprehending written text. They may experience difficulties with spelling and writing skills and exhibit slower reading speeds compared to their peers. 
“Although dyslexia is unrelated to mathematical processes, like addition and subtraction, it can also negatively impact a child’s ability to read, understand and complete word problems</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default WelcomePage;
