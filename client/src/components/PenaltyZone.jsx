// client/src/components/PenaltyZone.jsx
import React from 'react';

const penaltyStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    zIndex: 1000,
};

const PenaltyZone = ({ onClearPenalty }) => {
    return (
        <div style={penaltyStyle}>
            <h1>You are in the Penalty Zone!</h1>
            <p>You failed to complete all your daily quests.</p>
            <p>Survive this penalty to continue.</p>
            <button onClick={onClearPenalty} style={{ padding: '10px 20px', fontSize: '18px', marginTop: '20px' }}>
                Survive
            </button>
        </div>
    );
};

export default PenaltyZone;