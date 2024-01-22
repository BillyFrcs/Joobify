import React from 'react';

import SignInForm from '../../components/signin';
import { SimpleNavigation } from '@/components/navbar';

function SignIn() {
  return (
    <body>
      <SimpleNavigation />

      <SignInForm />
    </body>
  );
};

export default SignIn;