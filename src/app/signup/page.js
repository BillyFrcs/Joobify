import React from 'react';

import { SimpleNavigation } from '../../components/layouts/navbar';
import SignUpForm from '@/components/auth/signup';

function SignUp() {
  return (
    <div>
      <SimpleNavigation />

      <SignUpForm />
    </div>
  )
};

export default SignUp;