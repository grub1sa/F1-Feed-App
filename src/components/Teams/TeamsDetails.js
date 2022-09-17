import React, { useState } from "react";
import countryCodes from "../../helpers/countryCodes.json"
import { fetchTeamData } from "../../utils/api";
import { Link } from "react-router-dom";
import { FlagIcon } from "react-flag-kit";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import YearContext from "../../context/YearContext";
import { useEffect } from "react";

const TeamsDetails = () => {

    const [details, setDetails] = useState(null);
    const [results, setResults] = useState(null);
    const { year, handleYear } = useContext(YearContext);
    const [loading, setLoading] = useState(true);
    const [image, setImage] = useState(null);

    const params = useParams();
    const { teamName, id } = params;

    // const{Constructor,position,points,url}=details
    // const{round,raceName,Results}=results

    const getData = async (id, year) => {
        const [details, results, image] = await fetchTeamData(id, year);
        setDetails(
            details.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[0]);
        setResults(results.MRData.RaceTable.Races);
        setImage(image.query.pages[0]);

        setLoading(false);

    };

    useEffect(() => {
        try {
            getData(id, year);

        } catch (error) {
            console.warn(error.message);
            setLoading(false);

        }
    }, [id, year]);
    if (loading) {
        return <div>  loading...</div>
    }

    const getCode = (nationality) => {
        const country = countryCodes.find((country) => country.nationality === nationality);
        return country ? country.alpha_2_code : null;

    };
    const getCountry = (raceCountry) => {
        const country = countryCodes.find((country) => country.en_short_name === raceCountry);
        return country ? country.alpha_2_code : null;

    };



    console.log(results)

    return (
        <>
            <div className="wrapper-info">
                <div className="info-first">


                    <div id="image-name">
                        <div id="image">
                            {image.thumbnail && <img src={image.thumbnail.source} alt="Team" />}

                        </div>
                        <div id="name">
                            <FlagIcon
                                code={getCode(details.Constructor.nationality)}

                                className="flag"
                            />
                            <h3>{details.Constructor.name}</h3>

                        </div>

                    </div>
                    <div id="table-details">
                        <div>{`Nationality: ${details.Constructor.nationality}`}</div>
                        <div>{`position: ${details.position}`}</div>
                        <div>{`points: ${details.points}`}</div>

                        <div>Wiki: {<a style={{ color: 'lightblue' }} href={details.Constructor.url} target="_blank">Info</a>}</div>


                    </div>
                </div>
                <div className="tableContainer-details">
                    <table>
                        <thead>
                            <tr >
                                <th>Round</th>
                                <th>Grand Prix</th>
                                {results[0].Results.map((driver) => {
                                    return (
                                        <th>{driver.Driver.familyName}</th>

                                    )

                                })}
                                <th>Race</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((result) => {
                                const { round, raceName } = result;
                                const { points, Constructor } = result.Results[0];

                                return (
                                    <tr key={round}>
                                        <td>{round}</td>
                                        <td>
                                            <FlagIcon
                                                code={getCountry(result.Circuit.Location.country)}></FlagIcon>
                                            <Link to={__dirname + `Races/RaceDetails/${result.Circuit.circuitId}/${round}`}>
                                                {raceName}
                                            </Link>
                                        </td>
                                        <td>{result.Results[0].position}</td>
                                        <td>{result.Results[1].position}</td>
                                        <td>{points}</td>
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

export default TeamsDetails;