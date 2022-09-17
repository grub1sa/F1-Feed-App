import React, { useContext, useEffect, useState } from "react";
import YearContext from "../../context/YearContext";
import { fetchAllRaces } from "../../utils/api";
import Race from "./Race";


const RaceTable = () => {
    const [races, setRaces] = useState(null);
    const { year } = useContext(YearContext);
    const [loading, setLoading] = useState(true);

    const getData = async (year) => {
        const races = await fetchAllRaces(year);
        setRaces(races.MRData.RaceTable.Races);
        setLoading(false);

    }

    useEffect(() => {
        try {
            getData(year);

        } catch (error) {
            console.warn(error.message);
            setLoading(false);

        }

    }, [year])

    if (loading) {
        return <div>  loading...</div>
    }


    return (
        <>
            <div className="tableContainer">
                <table className="teamsTable" >
                    <thead>
                        <tr>
                            <th>Round</th>
                            <th>Grand Prix</th>
                            <th>Circuit</th>
                            <th>Date</th>
                            <th>Winner</th>
                        </tr>
                    </thead>
                    <tbody>

                        <Race props={races}></Race>
                    </tbody>


                </table>

            </div>
        </>

    );
}

export default RaceTable;