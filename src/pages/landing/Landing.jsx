import React from 'react';
import Hero from '../../components/landing/Hero';
import Features from '../../components/landing/Features';
import HowItWorks from '../../components/landing/HowItWorks';
import Pricing from '../../components/landing/Pricing';
import CallToAction from '../../components/landing/CallToAction';
import '../../css/Landing.css';

const Landing = () => {
  return (
    <div className="landing">
      <Hero />
      <Features />
      <HowItWorks />
      <Pricing />
      <CallToAction />
    </div>
  );
};

export default Landing;