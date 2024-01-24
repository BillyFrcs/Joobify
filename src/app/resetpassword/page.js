import React from 'react';

import ResetPasswordForm from '@/components/resetpassword';
import { SimpleNavigation } from '@/components/navbar';

const ResetPassword = () => {
    return (
        <div>
            <SimpleNavigation />

            <ResetPasswordForm />
        </div>
    );
};

export default ResetPassword;