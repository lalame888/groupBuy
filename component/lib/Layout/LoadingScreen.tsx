import React from 'react';
import { Spinner } from 'react-bootstrap';

export function LoadingScreen() {
  return (
    <div
      style={{
        display: 'flex',
        height: '95vh',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Spinner animation="border" />
    </div>
  );
}
