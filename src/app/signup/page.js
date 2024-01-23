import React from 'react';

import { SimpleNavigation } from '../../components/navbar';
import SignUpForm from '@/components/signup';

function SignUp() {
  return (
    <html lang='en'>
      <head></head>

      <body>
        <SimpleNavigation />

        <SignUpForm />
      </body>
    </html>
  )
};

export default SignUp;