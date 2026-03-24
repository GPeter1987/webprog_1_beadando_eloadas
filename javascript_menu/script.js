let pilotak = [
    { nev: "Damon Hill", nemzet: "brit" },
    { nev: "Fernando Alonso", nemzet: "spanyol" }
];


function megjelenit() {
    let lista = document.getElementById("lista");
    lista.innerHTML = "";

    pilotak.forEach(function(pilota, index) {
       lista.innerHTML += `
<tr>
    <td>${pilota.nev}</td>
    <td>${pilota.nemzet}</td>
    <td>
        <button onclick="torol(${index})">Törlés</button>
        <button onclick="modosit(${index})">Módosítás</button>
    </td>
</tr>
`;
    });
}


function hozzaad() {
    let nev = document.getElementById("nev").value;
    let nemzet = document.getElementById("nemzet").value;

    if (nev === "" || nemzet === "") {
        alert("Minden mezőt ki kell tölteni!");
        return;
    }

    pilotak.push({ nev: nev, nemzet: nemzet });

    document.getElementById("nev").value = "";
    document.getElementById("nemzet").value = "";

    megjelenit();
}


function torol(index) {
    pilotak.splice(index, 1);
    megjelenit();
}


function modosit(index) {
    let ujNev = prompt("Új név:", pilotak[index].nev);
    let ujNemzet = prompt("Új nemzet:", pilotak[index].nemzet);

    if (ujNev !== null && ujNemzet !== null) {
        pilotak[index].nev = ujNev;
        pilotak[index].nemzet = ujNemzet;
        megjelenit();
    }
}


megjelenit();