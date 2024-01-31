import React from 'react';

import ResetPasswordForm from '@/components/auth/resetPassword';
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