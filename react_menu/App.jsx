import React, { useState } from "react";
import PilotTable from "/tables/PilotTable";
import AddPilotForm from "/forms/AddPilotForm";
import EditPilotForm from "/forms/EditPilotForm";

const App = () => {
    /* ================ Init data ================ */
    const pilotData = [
        { id: 1, name: "Juan-Manuel Fangio", gender: "F", birthDate: "1911.6.24", nationality: "argentín"},
        { id: 2, name: "Sam Posey", gender: "F", birthDate: "1944.5.26", nationality: "amerikai"},
        { id: 3, name: "Ernesto Prinoth", gender: "F", birthDate: "1923.1.1", nationality: "olasz"},
        { id: 4, name: "Hubert Hahne", gender: "F", birthDate: "1935.3.28", nationality: "német"},
        { id: 5, name: "Bob Drake", gender: "F", birthDate: "1919.12.14", nationality: "amerikai"}
    ];

    /* ================ States ================ */
    const [pilots, setPilots] = useState(pilotData);
    const [currentPilot, setCurrentPilot] = useState("");
    const [editing, setEditing] = useState(false);

    /* ================ Functions ================ */
    const addPilot = pilot => {
        pilot.id = pilots.length + 1;
        setPilots([...pilots, pilot]);
    };

    const editPilotData = pilot => {
        setEditing(true);
        setCurrentPilot(pilot);
    };

    const deletePilot = id => {
        setEditing(false);
        setPilots(pilots.filter(pilot => pilot.id !== id));
    };

    const updatePilot = (id, updatedPilot) => {
        setEditing(false);
        setPilots(pilots.map(pilot => (pilot.id === id ? updatedPilot : pilot)));
    };


    return (
        <div>
            <h1>React menü</h1>
            <div>
                <h2>
                    {editing ? "Pilóta szerkesztése" : "Pilóta hozzáadása"}
                </h2>
                {!editing ? (
                    <AddPilotForm
                        addPilot={addPilot}
                    />
                ):(
                    <EditPilotForm
                        setEditing={setEditing}
                        currentPilot={currentPilot}
                        setCurrentPilot={setCurrentPilot}
                        updatePilot={updatePilot}
                    />
                )}
            </div>
            
            <div>
                <h2>Pilóták</h2>
                <PilotTable 
                    pilots={pilots} 
                    editPilotData={editPilotData}
                    deletePilot={deletePilot}
                />
            </div>
        </div>
    );
};

export default App;