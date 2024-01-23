import React from 'react';

import { SimpleNavigation } from '../../components/navbar';
import SignUpForm from '@/components/signup';

function SignUp() {
  return (
    <div>
      <SimpleNavigation />

      <SignUpForm />
    </div>
  )
};

export default SignUp;