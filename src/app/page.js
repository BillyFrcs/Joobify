import React from 'react'

import { Navigation } from '../components/layouts/navbar';

import LandingPage from '@/components/home/landing';
import JobsLists from '@/components/home/jobs';
import AboutPage from '@/components/home/about';
import TeamPage from '@/components/home/team';
import Footer from '@/components/home/footer';

function Home() {
  return (
    <div>
      <header>
        <Navigation />
      </header>

      <div>
        <LandingPage />
      </div>

      <div>
        <JobsLists />
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