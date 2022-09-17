import React from "react";
import countryCodes from "../../helpers/countryCodes.json"
import { FlagIcon } from "react-flag-kit";
import { Link } from "react-router-dom";

const Race = ({props}) => {

    const getCountry = (raceCountry) => {
        const country = countryCodes.find((country) => country.en_short_name === raceCountry);
        return country ? country.alpha_2_code : null;

    };


    return (
        <>
            {props.map(({ round, raceName, Circuit, date, Results }) => {

                const { circuitName, circuitId, Location } = Circuit;
                const {Driver}=Results[0];
                
                return (
                    <tr key={circuitId}>
                        <td>{round}</td>
                        <td>
                            <div>
                                <FlagIcon
                                    code={getCountry(Location.country)}

                                    className="flag"
                                />

                                <Link to={`/Races/RaceDetails/${circuitId}/${round}`}>
                                    {raceName}
                                </Link>
                            </div>
                        </td>
                        <td>{circuitName}</td>
                        <td>{date}</td>
                        <td>{Driver.familyName}</td>
                    </tr>

                );
            })}
        </>
    );
}

export default Race;