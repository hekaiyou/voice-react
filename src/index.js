import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    // 严格模式
    // <React.StrictMode>
    //     <App />
    // </React.StrictMode>,
    <App />,
    document.getElementById('root')
);

// 如果想要评估应用的性能, 可以传递一个函数来记录结果
// 例如: reportWebVitals(console.log)
reportWebVitals();
