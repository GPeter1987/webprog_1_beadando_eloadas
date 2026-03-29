const api = "http://localhost/fetchapi_menu/fetchapi_menu/api.php";

document.getElementById("form").addEventListener("submit", ment);
window.onload = betolt;

// BETÖLTÉS
function betolt() {
    fetch(api)
        .then(res => res.json())
        .then(data => {
            let rows = "";

            data.forEach(e => {
                rows += `
                <tr>
                    <td>${e.id}</td>
                    <td>${e.datum}</td>
                    <td>${e.pilotaaz}</td>
                    <td>${e.helyezes}</td>
                    <td>${e.hiba}</td>
                    <td>${e.csapat}</td>
                    <td>${e.tipus}</td>
                    <td>${e.motor}</td>
                    <td>
                        <button onclick='edit(${JSON.stringify(e)})'>Edit</button>
                        <button onclick='torol(${e.id})'>Delete</button>
                    </td>
                </tr>`;
            });

            document.getElementById("tabla").innerHTML = rows;
        });
}

// MENTÉS (CREATE + UPDATE)
function ment(e) {
    e.preventDefault();

    const id = document.getElementById("id").value;

    const adat = {
        id: id,
        datum: document.getElementById("datum").value,
        pilotaaz: document.getElementById("pilotaaz").value,
        helyezes: document.getElementById("helyezes").value,
        hiba: document.getElementById("hiba").value,
        csapat: document.getElementById("csapat").value,
        tipus: document.getElementById("tipus").value,
        motor: document.getElementById("motor").value
    };

    const method = id ? "PUT" : "POST";

    fetch(api, {
        method: method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(adat)
    })
    .then(res => res.json())
    .then(() => {
        betolt();
        document.getElementById("form").reset();
        document.getElementById("id").value = "";
    });
}

// EDIT
function edit(e) {
    document.getElementById("id").value = e.id;
    document.getElementById("datum").value = e.datum;
    document.getElementById("pilotaaz").value = e.pilotaaz;
    document.getElementById("helyezes").value = e.helyezes;
    document.getElementById("hiba").value = e.hiba;
    document.getElementById("csapat").value = e.csapat;
    document.getElementById("tipus").value = e.tipus;
    document.getElementById("motor").value = e.motor;
}

// DELETE
function torol(id) {
    fetch(api, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ id })
    })
    .then(() => betolt());
}