import React from "react";

const PilotTable = props => (
    <table>
        <thead>
            <tr>
                <th>Azonosító</th>
                <th>Név</th>
                <th>Nem</th>
                <th>Születési dátum</th>
                <th>Nemzetiség</th>
            </tr>
        </thead>
        <tbody>
            {props.pilots.length > 0 ? (
                props.pilots.map(pilot => (
                <tr key={pilot.id}>
                    <td>{pilot.name}</td>
                    <td>{pilot.gender}</td>
                    <td>{pilot.birthDate}</td>
                    <td>{pilot.nationality}</td>
                    <td>
                    <button onClick={() => {props.editPilotData(pilot);}}>Szerkesztés</button>
                    <button onClick={() => props.deletePilot(pilot.id)}>Törlés</button>
                    </td>
                </tr>
                ))
            ) : (
                <tr>
                <td colSpan={3}>No pilots</td>
                </tr>
            )}
        </tbody>
    </table>
);
export default PilotTable;