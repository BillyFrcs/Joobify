import React from 'react';

import ResetPasswordForm from '@/components/auth/resetpassword';
import { SimpleNavigation } from '@/components/layouts/navbar';

const ResetPassword = () => {
    return (
        <div>
            <SimpleNavigation />

            <ResetPasswordForm />
        </div>
    );
};

export default ResetPassword;