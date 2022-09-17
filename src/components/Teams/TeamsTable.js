import React,{useState,useEffect,useContext} from "react";
import Team from "./Team";
import YearContext from "../../context/YearContext";
import {fetchAllTeams} from "../../utils/api";
import './Teams.css'

const TeamsTable=()=>{
    const [teams,setTeams]=useState([]);
    const {year,handleYear}=useContext(YearContext);

    useEffect(()=>{
        fetchAllTeams(year).then((teams)=>{
            setTeams(teams.MRData.StandingsTable.StandingsLists[0].ConstructorStandings)
        })
    },[year])

    return(
        <>
        <div className="tableContainer">

        
        <table className="teamsTable" >
           <tbody>
           <Team props={teams}/>

           </tbody>
                
            
        </table>
        </div>
        </>
    );
}

export default TeamsTable;