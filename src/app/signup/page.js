import React from 'react';

import { SimpleNavigation } from '../../components/navbar';
import SignUpForm from '@/components/signup';

function SignUp() {
  return (
    <body>
      <SimpleNavigation />
      
      <SignUpForm />
    </body>
  )
};

export default SignUp;