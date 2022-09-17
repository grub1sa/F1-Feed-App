import React, { useContext, useEffect, useState } from "react";
import countryCodes from "../../helpers/countryCodes.json"
import { FlagIcon } from "react-flag-kit";
import { Link, useParams } from "react-router-dom";
import YearContext from "../../context/YearContext";
import { fetchRacesData } from "../../utils/api";

const RaceDetails = () => {
    const [raceResults, setRaceResults] = useState(null);
    const [qualifiers, setQalifiers] = useState(null);
    const { year } = useContext(YearContext);

    const [loading, setLoading] = useState(true);

    const params = useParams()
    const { raceName, id } = useParams()

    const getData = async (year, id) => {
        const [raceResults, qualifiers] = await fetchRacesData(id, year);
        setRaceResults(raceResults.MRData.RaceTable.Races[0]);
        setQalifiers(qualifiers.MRData.RaceTable.Races[0].QualifyingResults);
        setLoading(false);
    }



    useEffect(() => {

        try {
            getData(year, id)

        } catch (error) {
            console.warn(error.message);
            setLoading(false);
        }
    }, [year, id])
    if (loading) {
        return <div>  loading...</div>
    }

    const getCountry = (raceCountry) => {
        const country = countryCodes.find((country) => country.en_short_name === raceCountry);
        return country ? country.alpha_2_code : null;

    };
    const getCode = (nationality) => {
        const country = countryCodes.find((country) => country.nationality === nationality);
        return country ? country.alpha_2_code : null;

    };
    const convertTime = (time) => {
        let a = time.split(":");
        return parseFloat(a[0]) * 60 + parseFloat(a[1]);

    }
    const returnBestTime = (qualifier) => {

        if (qualifier.Q3) {

            if (convertTime(qualifier.Q3) < convertTime(qualifier.Q2) && convertTime(qualifier.Q3) < convertTime(qualifier.Q1)) {
                return qualifier.Q3;

            }
        }

        if (qualifier.Q2 && convertTime(qualifier.Q2) < convertTime(qualifier.Q1)) {

            return qualifier.Q2;
        }


        return qualifier.Q1;

    }


    return (
        <>
            <div className="wrapper-info">
                <div className="info-first">


                    <div id="image-name">

                        <div id="name">
                            <FlagIcon
                                code={getCountry(raceResults.Circuit.Location.country)}

                                className="flag"
                            />
                            <h3>{raceResults.raceName}</h3>

                        </div>

                    </div>
                    <div id="table-details">
                        <div>{`Country: ${raceResults.Circuit.Location.country}`}</div>
                        <div>{`Location: ${raceResults.Circuit.Location.locality}`}</div>
                        <div>{`Date: ${raceResults.date}`}</div>

                        <div>Wiki: {<a style={{ color: 'lightblue' }} href={raceResults.url} target="_blank">Info</a>}</div>


                    </div>
                </div>
                <div className="table-races">


                    <table>
                        <thead>
                            <tr>
                                <th>Pos</th>
                                <th>Driver</th>
                                <th>Team</th>
                                <th>Best Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {qualifiers.map((qualifier) => {
                                const { position, Driver, Constructor, Q1, Q2, Q3 } = qualifier;

                                let min = returnBestTime(qualifier);



                                return (
                                    <tr key={position}>
                                        <td>{position}</td>
                                        <td>
                                            <FlagIcon
                                                code={getCode(Driver.nationality)}></FlagIcon>
                                            <Link to={__dirname + `races/race/${position}`}>
                                                {Driver.familyName}
                                            </Link>
                                        </td>
                                        <td>{Constructor.name}</td>

                                        <td>
                                            {min}
                                            {/* {Q1 > Q2 && Q1 > Q3  ? Q1 : Q2 > Q3 ? Q2 : Q3} */}
                                        </td>
                                    </tr>
                                );
                            })
                            }

                        </tbody>
                    </table>
                </div>
                <div className="table-races">

                    <table className="aaa">
                        <thead>
                            <tr>
                                <th>Pos</th>
                                <th>Driver</th>
                                <th>Team</th>
                                <th>Results</th>
                                <th>Points</th>
                            </tr>
                        </thead>
                        <tbody>



                            {raceResults.Results.map((result) => {
                                const { position, Driver, Constructor, points } = result;
                                const { Time } = result;


                                let time;
                                if (Time !== undefined) {
                                    time = Time.time;
                                }
                                else {
                                    time = "No data";
                                }



                                return (
                                    <tr key={position}>
                                        <td>{position}</td>
                                        <td>
                                            <FlagIcon
                                                code={getCode(Driver.nationality)}></FlagIcon>
                                            <Link to={__dirname + `Drivers/DriverDetails/${Driver.familyName}/${Driver.driverId}`}>
                                                {Driver.familyName}
                                            </Link>
                                        </td>
                                        <td>{Constructor.name}</td>

                                        <td>
                                            {time}

                                        </td>
                                        <td>{points}</td>
                                    </tr>
                                );
                            })
                            }

                        </tbody>
                    </table>
                </div>

            </div>
        </>
    );
}

export default RaceDetails;