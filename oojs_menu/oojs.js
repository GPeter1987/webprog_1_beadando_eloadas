class Ember 
{
    constructor(nev, nemzet)
    {
        this.nev=nev;
        this.nemzet=nemzet;
    }
}

class Pilota extends Ember
{
    constructor(nev,nemzet,datum,helyezes,csapat,motor)
    {
        super(nev,nemzet);
        this.datum=datum;
        this.helyezes=helyezes;
        this.csapat=csapat;
        this.motor=motor;
    }

    megjelenit()
    {
        let kartya = document.createElement("div");
        kartya.className = "kartya";

        let belso = document.createElement("div");
        belso.className = "belso";

        let elol = document.createElement("div");
        elol.className = "oldal elol";

        let hatul = document.createElement("div");
        hatul.className = "oldal hatul";

        elol.innerHTML = `
             <strong>Név<br>
             </strong> ${this.nev}<br>
             <br>
             <strong>Nemzetiség<br>
             </strong> ${this.nemzet}
        `;

        hatul.innerHTML=`
            Dátum:${this.datum}<br>
        🏁 Helyezés:
         ${this.helyezes || "-"}<br>
        🏎️ Csapat:${this.csapat || "ismeretlen"}<br>
        🔩 Motor:${this.motor || "ismeretlen"}

        `;

        belso.appendChild(elol);
        belso.appendChild(hatul);
        kartya.appendChild(belso);

        kartya.onclick=function()

        {
            kartya.classList.toggle("flip");
           
        }

        document.getElementById("container").appendChild(kartya);

    };

     
}


function betolt()

{

    document.getElementById("container").innerHTML = "";

    Promise.all([
        fetch("db/pilota.txt").then(r=>r.text()),
        fetch("db/eredmeny.txt").then(r=>r.text()),
 
    ])
    .then(([pilotaText, eredmenyText]) => {

        

        let pilotak = {};
        let pilotaSorok = pilotaText.split("\n");

       
        for (let i = 1; i < pilotaSorok.length; i++) {
            let adatok = pilotaSorok[i].split("\t");

            let az = adatok[0];
            let nev = adatok[1];
            let nemzet = adatok[4];

            pilotak[az] = { nev, nemzet };
        }

       let eredmenySorok = eredmenyText.split("\n");

       
        for (let i = 1; i < 4; i++)
            
            
        { 
            let adatok = eredmenySorok[i].split("\t");

            let datum = adatok[0];
            let pilotaaz = adatok[1];
            let helyezes = adatok[2];
            let csapat = adatok[4];
            let motor = adatok[5];

            if (pilotak[pilotaaz]) {
                let p = new Pilota(
                    pilotak[pilotaaz].nev,
                    pilotak[pilotaaz].nemzet,
                    datum,
                    helyezes,
                    csapat,
                    motor,
                );

                p.megjelenit();
            }
        }
    })

     

    .catch(err => console.log("HIBA:", err));

}


    
