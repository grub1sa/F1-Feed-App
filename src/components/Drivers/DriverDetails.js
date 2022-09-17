import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import YearContext from "../../context/YearContext";
import { fetchDriverData } from "../../utils/api";
import { Link } from "react-router-dom";
import countryCodes from "../../helpers/countryCodes.json"
import { FlagIcon } from "react-flag-kit"; 

const DriverDetails = () => {
    const [details, setDetails] = useState(null);
    const [image, setImage] = useState(null);
    const [races, setRaces] = useState(null);
    const { year, handleYear } = useContext(YearContext);
    const [loading, setLoading] = useState(true);


    const params = useParams();
    const { driverName, id } = params;

    const { givenName, familyName, nationality, dateOfBirth,url } = details || {};
    const { number, Constructor } = races ? races[0]?.Results[0] : {};

    //getyear

    const getData = async (id, year, driverName) => {
        const [details, races, image] = await fetchDriverData(id, year, driverName);
        setDetails(
            details.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Driver
        );
        setRaces(races.MRData.RaceTable.Races);
        setImage(image.query.pages[0]);
        setLoading(false);

    };
    useEffect(() => {
        try {
            getData(id, year, driverName);

        } catch (error) {
            console.warn(error.message);
            setLoading(false);

        }
    }, [id, year, driverName]);
    if (loading) {
        return <div>  loading...</div>
    }

    const getCode = (nationality) => {
        const country = countryCodes.find((country) => country.nationality === nationality);
        return country ? country.alpha_2_code : null;

    };
    
  
    return (
        <>
            <div className="wrapper-info">
                <div className="info-first">
        
                
                <div id="image-name">
                    <div id="image">
                        {image.thumbnail && <img src={image.thumbnail.source} alt="Driver" />}

                    </div>
                    <div id="name">
                    <FlagIcon
                                    code={getCode(nationality)}
                                    
                                    className="flag"
                                />
                        <h3>{`${givenName} ${familyName}`}</h3>

                    </div>

                </div>
                <div id="table-details">
                    <div>{`Nationality: ${nationality}`}</div>
                    <div>{`Team: ${Constructor.name}`}</div>
                    <div>{`Birth: ${dateOfBirth}`}</div>
                    <div>{`Number: ${number}`}</div>
                    <div>Wiki: {<a style={{color:'lightblue'}} href={url} target="_blank">Biography</a>}</div>


                </div>
                </div>
                <div className="tableContainer-details">

                
                <table>
                    <thead>
                        <tr>
                            <th>Round</th>
                            <th>Grand Prix</th>
                            <th>Team</th>
                            <th>Grid</th>
                            <th>Race</th>
                        </tr>
                    </thead>
                    <tbody>
                        {races.map((race) => {
                            const { round, raceName } = race;
                            const { grid, position, Constructor } = race.Results[0];

                            return (
                                <tr key={round}>
                                    <td>{round}</td>
                                    <td>
                                        <Link to={__dirname + `Races/RaceDetails/${race.Circuit.circuitId}/${round}`}>
                                            {raceName}
                                        </Link>
                                    </td>
                                    <td>{Constructor.name}</td>
                                    <td>{grid}</td>
                                    <td>{position}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                </div>

            </div>
        </>
    );
}
export default DriverDetails;