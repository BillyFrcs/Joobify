import React from "react";

const WarningMessage = ({message}) => {
    return (
        <div className="mt-2 mb-2">
            <p className='text-sm text-green-500'>{message} is not available at the moment</p>
            <p className='text-sm text-green-500'>Please <span className="font-bold">Continue with Google</span> instead, thanks!</p>
        </div>
    )
}

export default WarningMessage;