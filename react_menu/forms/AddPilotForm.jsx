import React, { useState} from "react";

const AddPilotForm = props => {
    const [pilot, setPilot] = useState(
        {   name:"", 
            gender:"", 
            birthDate:"", 
            nationality:""
        }
    );

    const handleInputChange = event => {
        const {name, gender, birthDate, nationality} = event.target;
        setPilot({...pilot, [name]:value });
    };

    return (
        <form
            onSubmit={event => {
                event.preventDefault();
                if(!pilot.name || !pilot.gender || !pilot.birthDate || !pilot.nationality) return;
                props.addPilot(pilot);
                setPilot({
                    name:"", 
                    gender:"", 
                    birthDate:"", 
                    nationality:""
                })
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
            <button>Pilóta hozzáadása</button>

        </form>
    );

};
export default AddPilotForm;