import React from "react";
import YearContext from "../../context/YearContext";
import { fetchAllTeams } from "../../utils/api";
import countryCodes from '../../helpers/countryCodes.json'
import { Link } from "react-router-dom";
import { FlagIcon } from 'react-flag-kit';

export default function Team({props}){
    const getCode = (nationality) => {
        const country = countryCodes.find((country) => country.nationality === nationality);
        return country ? country.alpha_2_code : null;

    };

    return(
        <>
            {props.map(({position,points,Constructor})=>{
                
                const{constructorId,url,name,nationality}=Constructor;
                
                let teamName=url.split("/").pop()
                return(
                    <tr key={constructorId}>
                    <td>{position}</td>
                    <td>
                        <div>
                            <FlagIcon
                                code={getCode(nationality)}
                                size={20}
                                className="flag"
                            />

                            {name}
                        </div>
                    </td>
                    <td><Link to={`/Teams/TeamDetails/${teamName}/${constructorId}`}>
                                Details 
                            </Link></td>
                    <td>{points}</td>
                </tr>

                );
            })}
        </>
    );
}