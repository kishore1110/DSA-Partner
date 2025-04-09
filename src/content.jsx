import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import FloatingButton from './components/FloatingButton';

const root = document.createElement("div");
root.id = "crx-root";
document.body.appendChild(root);

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <FloatingButton />
  </React.StrictMode>
)
