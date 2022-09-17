import { useContext } from "react";
import { Link } from "react-router-dom";
import { FlagIcon } from 'react-flag-kit';
import countryCodes from '../../helpers/countryCodes.json';
import React from "react";
const Driver = ({ drivers }) => {
    const getCode = (nationality) => {
        const country = countryCodes.find((country) => country.nationality === nationality);
        return country ? country.alpha_2_code : null;

    };
    
    return (
        <>

        
            {drivers.map(({ position, points, Driver, Constructors }) => {
                const { driverId, givenName, familyName, nationality, url } = Driver;

                let driverName = url.split("/").pop();

                return (
                    <tr key={driverId}>
                        <td>{position}</td>
                        <td>
                            <div>
                                <FlagIcon
                                    code={getCode(nationality)}
                                    size={20}
                                    className="flag"
                                />

                                <Link to={`/Drivers/DriverDetails/${driverName}/${driverId}`}>
                                    {`${givenName} ${familyName}`}
                                </Link>
                            </div>
                        </td>
                        <td>{Constructors[0].name}</td>
                        <td>{points}</td>
                    </tr>
                );
            })}
        </>

    );
}

export default Driver;