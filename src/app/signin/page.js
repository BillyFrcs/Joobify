import React from 'react';

import SignInForm from '../../components/signin';
import { SimpleNavigation } from '@/components/navbar';

function SignIn() {
  return (
    <div>
      <SimpleNavigation />

      <SignInForm />
    </div>
  );
};

export default SignIn;