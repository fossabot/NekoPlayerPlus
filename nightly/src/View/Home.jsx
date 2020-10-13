import React from 'react';
import { Link } from 'react-router-dom';

const { ipcRenderer } = require('electron');

export default function Home() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Casa</Link>
          </li>
        </ul>
      </nav>
      <h2>Casa</h2>
      <input
        type="button"
        value="prueva"
        onClick={() => {
          ipcRenderer.send('toggle-prueva');
        }}
      />
    </div>
  );
}
