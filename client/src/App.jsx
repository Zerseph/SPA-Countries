import './App.css';
import { Route, Routes } from "react-router-dom"
import Home from './Components/Home/Home.jsx';
import ActivityForm from './Components/ActivityForm/ActivityForm.jsx';
import MoreDetailsCountry from './Components/MoreDetailsCountry/MoreDetailsCountry.jsx';
import LandingPage from './Components/LandingPage/LandingPage.jsx'; // Importa el nuevo componente LandingPage

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create-activity" element={<ActivityForm />} />
        <Route path="/countries/:id" element={<MoreDetailsCountry />} />
      </Routes>
    </div>
  );
}

export default App;
