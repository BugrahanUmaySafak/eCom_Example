import React from 'react';
import '../css/CommonState.css';

interface CommonStateProps {
        loading: boolean;
        error: string | null;
}

const CommonState: React.FC<CommonStateProps> = ({ loading, error }) => {
        if (loading) {
                return <div className="backdrop"><div className="spinner"></div></div>;
        }

        if (error) {
                return <div className="error-message">{error}</div>;
        }

        return null;
}

export default CommonState;
