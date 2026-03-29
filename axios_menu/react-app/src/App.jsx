import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost/axios_menu/backend/api.php";

function App() {
  const [pilotak, setPilotak] = useState([]);
  const [message, setMessage] = useState("");

  const [az, setAz] = useState("");
  const [nev, setNev] = useState("");
  const [nem, setNem] = useState("F");
  const [szuldat, setSzuldat] = useState("");
  const [nemzet, setNemzet] = useState("");
  const [editAz, setEditAz] = useState(null);

  useEffect(() => {
    fetchPilotak();
  }, []);

  const fetchPilotak = async () => {
    const res = await axios.get(API_URL);
    setPilotak(res.data.readData);
    setMessage(res.data.status);
  };

  const clearForm = () => {
    setAz("");
    setNev("");
    setNem("F");
    setSzuldat("");
    setNemzet("");
    setEditAz(null);
  };

  const submit = async () => {
    console.log("Küldött adat:", { az, nev, nem, szuldat, nemzet }); // DEBUG

    var res;
    if (editAz) {
      res = await axios.put(API_URL, { az: editAz, nev, nem, szuldat, nemzet });
    } else {
      res = await axios.post(API_URL, {az: parseInt(az), nev, nem, szuldat, nemzet });
    }
    setMessage(res.data.status);
    clearForm();
    fetchPilotak();
  };

  const editPilota = (pilota) => {
    setEditAz(pilota.az);
    setNev(pilota.nev);
    setNem(pilota.nem);
    setSzuldat(pilota.szuldat);
    setNemzet(pilota.nemzet);
  };

  const deletePilota = async (az) => {
    if (!confirm("Biztosan törlöd ezt a pilótát?")) return;
    const res = await axios.delete(API_URL, { data: { az } });
    setMessage(res.data.status);
    fetchPilotak();
  };

  return (
    <div>
      <h3>F1 Pilóták CRUD</h3>
      <p>{message}</p>

      <div>
        <input
          type="number"
          value={az}
          onChange={(e) => setAz(e.target.value)}
          placeholder="Azonosító"
          disabled={editAz !== null}
        />
        <input
          value={nev}
          onChange={(e) => setNev(e.target.value)}
          placeholder="Név"
        />
        <select value={nem} onChange={(e) => setNem(e.target.value)}>
          <option value="F">Férfi</option>
          <option value="N">Női</option>
        </select>
        <input
          type="date"
          value={szuldat}
          onChange={(e) => setSzuldat(e.target.value)}
          placeholder="Születési dátum"
        />
        <input
          value={nemzet}
          onChange={(e) => setNemzet(e.target.value)}
          placeholder="Nemzetiség"
        />
        <button onClick={submit}>{editAz ? "Módosítás" : "Hozzáadás"}</button>
        {editAz && <button onClick={clearForm}>Mégse</button>}
      </div>

      <table>
        <thead>
          <tr>
            <th>Az</th>
            <th>Név</th>
            <th>Nem</th>
            <th>Születési dátum</th>
            <th>Nemzetiség</th>
            <th>Műveletek</th>
          </tr>
        </thead>
        <tbody>
          {pilotak.map((pilota) => (
            <tr key={pilota.az}>
              <td>{pilota.az}</td>
              <td>{pilota.nev}</td>
              <td>{pilota.nem}</td>
              <td>{pilota.szuldat}</td>
              <td>{pilota.nemzet}</td>
              <td>
                <button onClick={() => editPilota(pilota)}>Szerkesztés</button>
                <button onClick={() => deletePilota(pilota.az)}>Törlés</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;