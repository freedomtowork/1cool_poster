
import React from 'react';
import Navbar from '../components/Navbar';
import MembershipCard from '../components/MembershipCard';
import Footer from '../components/Footer';

const Pricing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-20"></div>
      <MembershipCard />
      <Footer />
    </div>
  );
};

export default Pricing;
