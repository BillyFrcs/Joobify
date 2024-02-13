import React from "react";

const WarningMessageSignUp = () => {
    return (
        <div className="mt-2 mb-2">
            <p className='text-sm text-green-500'>Sign up is not available at the moment</p>
            <p className='text-sm text-green-500'>Please <span className="font-bold">Continue with Google</span> instead, thanks!</p>
        </div>
    )
}

const WarningMessageSignIn = () => {
    return (
        <div className="mt-2 mb-2">
            <p className='text-sm text-green-500'>Sign in is not available at the moment</p>
            <p className='text-sm text-green-500'>Please <span className="font-bold">Continue with Google</span> instead, thanks!</p>
        </div>
    )
}

export { WarningMessageSignUp, WarningMessageSignIn };