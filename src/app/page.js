'use client';

import React, { useState, useEffect } from 'react'

import { Navigation } from '../components/layouts/navbar';
import { verifyUserToken, setToken, getToken } from '@/middleware/auth';

import LandingPage from '@/components/home/landing';
import JobsList from '@/components/home/jobs';
import AboutPage from '@/components/home/about';
import TeamPage from '@/components/home/team';
import Footer from '@/components/home/footer';

function Home() {
  useEffect(() => {
    getToken();
  }, []);

  return (
    <div>
      <header>
        <Navigation linkName="/dashboard" navName="Dashboard" />
      </header>

      <div>
        <LandingPage />
      </div>

      <div>
        <JobsList />
      </div>

      <div>
        <AboutPage />
      </div>

      <div>
        <TeamPage />
      </div>

      <div>
        <Footer />
      </div>
    </div>
  )
};

export default Home;