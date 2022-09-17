
import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom' ;
import Nav from './components/Nav';
import Header from './components/Header';
import YearContext from './context/YearContext';
import React,{useState} from 'react';
import DriversTable from './components/Drivers/DriversTable';
import DriverDetails from './components/Drivers/DriverDetails';
import TeamsTable from './components/Teams/TeamsTable';
import TeamsDetails from './components/Teams/TeamsDetails';
import RaceTable from './components/Races/RacesTable';
import RaceDetails from './components/Races/RacesDetails';
function App() {

  const [year,setYear] = useState(2022);

  const handleYear=(year)=>{setYear(year);}
  return (
    
    <Router>
      
      <YearContext.Provider value={{year, handleYear}}>
      <div className='container'>
      <Nav></Nav>
      <div className='wrapp'>
        <Header></Header>
      <Routes>
      <Route path="/" element={<DriversTable/>}></Route>
      <Route path="Drivers" element={<DriversTable/>}></Route>
      <Route path="/Teams" element={<TeamsTable></TeamsTable>}></Route>
      <Route path="/Races" element={<RaceTable></RaceTable>}></Route>
      <Route path='/Drivers/DriverDetails/:driverName/:id' element={<DriverDetails />} />
      <Route path='/Teams/TeamDetails/:teamName/:id' element={<TeamsDetails />} />
      <Route path='/Races/RaceDetails/:circuitId/:id' element={<RaceDetails />} />
      </Routes>

      </div>

      </div>

     
      </YearContext.Provider>
    
    </Router>
  );
}

export default App;
