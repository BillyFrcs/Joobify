import React from 'react';

import SignInForm from '../../components/signin';
import { SimpleNavigation } from '@/components/navbar';

function SignIn() {
  return (
    <html lang='en'>
      <head></head>

      <body>
        <SimpleNavigation />

        <SignInForm />
      </body>
    </html>
  );
};

export default SignIn;