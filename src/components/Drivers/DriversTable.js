import React,{useState,useEffect,useContext} from "react";
import Driver from "./Driver";
import YearContext from "../../context/YearContext";
import {fetchAllDrivers} from "../../utils/api";
import './Drivers.css';


const DriversTable=()=>{
    const [drivers, setDrivers]=useState([]);

     const{year , handleYear}=useContext(YearContext);

    useEffect(()=>{
        fetchAllDrivers(year).then((drivers)=>{
            setDrivers( drivers.MRData.StandingsTable.StandingsLists[0].DriverStandings);
            
        });
    },[year]);
    
    

    
    return(
        <>
       
      <div className="tableContainer">

      
        <table className="driversTable" >
           <tbody>
           <Driver drivers={drivers}/>

           </tbody>
                
            
        </table>
        </div>

        </>
    );
}

export default DriversTable;