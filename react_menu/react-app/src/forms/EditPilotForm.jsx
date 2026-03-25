import React, { useState, useEffect } from "react";

const EditPilotForm = props => {
    const [pilot, setPilot] = useState(props.currentPilot);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setPilot({ ...pilot, [name]: value });
    };

    useEffect(() => {
        setPilot(props.currentPilot);
    }, [props]);

    return (
        <form
            onSubmit={event => {
                event.preventDefault();
                props.updatePilot(pilot.id, pilot);
            }}
        >
            <label>Név</label>
            <input type="text" name="name" value={pilot.name} onChange={handleInputChange}/>
            <label>Nem</label>
            <input type="text" name="gender" value={pilot.gender} onChange={handleInputChange}/>
            <label>Születési dátum</label>
            <input type="text" name="birthDate" value={pilot.birthDate} onChange={handleInputChange}/>
            <label>Nemzetiség</label>
            <input type="text" name="nationality" value={pilot.nationality} onChange={handleInputChange}/>
            <button>Pilóta adatainak frissítése</button>
            <button onClick={() => props.setEditing(false)}>Mégsem</button>
        </form>
    );
};
export default EditPilotForm;