import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// please help me
const viewportWidth = document.documentElement.clientWidth - 30;
const viewportHeight = document.documentElement.clientHeight - 30;

ReactDOM.render(
    <App
        width={viewportWidth}
        height={viewportHeight}
        zoomingScale={1.1}
        numberOfPoints={300}
        initialXrange={[-10, 10]}
        initialYrange={[-10, 10]}
        initialExpression="5*sin(x)"
    />,
    document.getElementById('root')
);
