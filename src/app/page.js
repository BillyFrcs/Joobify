import React from 'react'
import Image from 'next/image'

import { Navigation } from '../components/layouts/navbar';

function Home() {
  return (
    <div>
      <header>
        <Navigation />
      </header>
    </div>
  )
};

export default Home;