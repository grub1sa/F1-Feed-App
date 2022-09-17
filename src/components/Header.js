import React, { useContext } from "react";
import YearContext from "../context/YearContext";
import './Header.css';

const Header=()=>{

    const {year,handleYear}=useContext(YearContext);

    const getYears=()=>{
        const years=[];
        for(let y =2022;y>=1950;y--){
            years.push(y);
        }
        return years;
    };
    
return(
    <div className="header">
        <h1>Formula feed</h1>
        <div>
        <label>Year</label>
          <select
            value={year}
            onChange={(e) => handleYear(e.target.value)}
          >
            {getYears().map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

        </div>
        
    </div>
);
}
export default Header;