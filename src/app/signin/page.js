import React from 'react';

import SignInForm from '../../components/auth/signin';
import { SimpleNavigation } from '@/components/layouts/navbar';

function SignIn() {
  return (
    <div>
      <SimpleNavigation />

      <SignInForm />
    </div>
  );
};

export default SignIn;