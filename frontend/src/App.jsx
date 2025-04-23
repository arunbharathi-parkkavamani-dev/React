import axios from 'axios';
import { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './AppRoutes';

function App() {
  const [expanded, setExpanded] = useState(false);

  axios.defaults.withCredentials = true;

  return (
    <Router>
      <AppRoutes expanded={expanded} setExpanded={setExpanded} />
    </Router>
  );
}

export default App;

