// SPIELDATEN-SPEICHERZENTRALE
const standardSpiele = [
    { id: 1, d: "Mi. 29.07.2026, 10:30", jsDate: "2026-07-29T14:00:00", h: "TV Mörsch",          g: "1. SV Mörsch",       e: "-:-", o: "FT Forchheim (Bachbergfest)" },
    { id: 2, d: "Mi. 29.07.2026, 11:30", jsDate: "2026-07-29T15:00:00", h: "TV Mörsch",          g: "FV Spfr. Forchheim", e: "-:-", o: "FT Forchheim (Bachbergfest)" },
    { id: 3, d: "Do. 30.07.2026, 16:30", jsDate: "2026-07-30T16:30:00", h: "SC Neuburgweier",    g: "FT Forchheim",       e: "-:-", o: "FT Forchheim (Bachbergfest)" },
    { id: 4, d: "Do. 30.07.2026, 19:00", jsDate: "2026-07-30T19:00:00", h: "FV Spfr. Forchheim",  g: "SC Neuburgweier",    e: "-:-", o: "FV Spfr. Forchheim" },
    { id: 5, d: "Fr. 31.07.2026, 18:00", jsDate: "2026-07-31T18:00:00", h: "1. SV Mörsch",       g: "FV Spfr. Forchheim", e: "-:-", o: "1. SV Mörsch (Sportfest)" },
    { id: 6, d: "Fr. 31.07.2026, 19:30", jsDate: "2026-07-31T19:30:00", h: "FT Forchheim",       g: "TV Mörsch",          e: "-:-", o: "1. SV Mörsch (Sportfest)" },
    { id: 7, d: "Sa. 01.08.2026, 17:00", jsDate: "2026-08-01T17:00:00", h: "FV Spfr. Forchheim",  g: "FT Forchheim",       e: "-:-", o: "1. SV Mörsch (Sportfest)" },
    { id: 8, d: "Sa. 01.08.2026, 18:30", jsDate: "2026-08-01T18:30:00", h: "1. SV Mörsch",       g: "SC Neuburgweier",    e: "-:-", o: "1. SV Mörsch (Sportfest)" },
    { id: 9, d: "So. 02.08.2026, 18:00", jsDate: "2026-08-02T18:00:00", h: "TV Mörsch",          g: "SC Neuburgweier",    e: "-:-", o: "SC Neuburgweier (Jubiläum)" },
    { id: 10, d: "So. 02.08.2026, 19:30", jsDate: "2026-08-02T19:30:00", h: "FT Forchheim",       g: "1. SV Mörsch",       e: "-:-", o: "SC Neuburgweier (Jubiläum)" }
];

const finaleJsDate = "2026-07-22T19:00:00";
const finaleOrt = "Spielort: SC Neuburgweier (Sportplatz)";

// Prüfen, ob bereits Live-Daten vom Handy existieren, sonst Standard laden
if (!localStorage.getItem('turnier_spiele')) {
    localStorage.setItem('turnier_spiele', JSON.stringify(standardSpiele));
}
if (!localStorage.getItem('finale_erg')) {
    localStorage.setItem('finale_erg', "-:-");
}

function berechneAlles() {
    const jetzt = new Date();
    const heuteString = jetzt.getFullYear() + "-" + String(jetzt.getMonth()+1).padStart(2,'0') + "-" + String(jetzt.getDate()).padStart(2,'0');
    const teams = ["TV Mörsch", "1. SV Mörsch", "FV Spfr. Forchheim", "SC Neuburgweier", "FT Forchheim"];
    
    let t = {};
    teams.forEach(name => { t[name] = { name: name, s: 0, t: 0, g: 0, p: 0 }; });

    let spieleListe = JSON.parse(localStorage.getItem('turnier_spiele'));
    let html = "";
    
    // Nur die wichtigsten 5 Spiele auf dem Bildschirm anzeigen (Zwecks Platz und Lesbarkeit)
    spieleListe.slice(-5).forEach(s => {
        let spielZeit = new Date(s.jsDate);
        let spielEnde = new Date(spielZeit.getTime() + (105 * 60 * 1000));
        let istGleicherTag = s.jsDate.startsWith(heuteString);
        
        let statusKlasse = "spiel-row";
        let badgeHtml = "";

        if (s.e === "-:-") {
            if (jetzt >= spielZeit && jetzt <= spielEnde) {
                statusKlasse += " live";
                badgeHtml = ' <span class="badge-live">LIVE</span>';
            } else if (istGleicherTag && jetzt < spielZeit) {
                statusKlasse += " heute";
                badgeHtml = ' <span class="badge-heute">Heute</span>';
            }
        }

        html += `<div class="${statusKlasse}">
            <div class="spiel-zeit">${s.d}${badgeHtml}</div>
            <div class="spiel-paarung">${s.h} - ${s.g}</div>
            <div class="spiel-erg">${s.e}</div>
            <div class="spiel-ort">${s.o}</div>
        </div>`;
        
        let m = s.e.match(/^(\d+):(\d+)$/);
        if (m && t[s.h] && t[s.g]) {
            let th = parseInt(m[1], 10), tg = parseInt(m[2], 10);
            t[s.h].s++; t[s.h].t += th; t[s.h].g += tg;
            t[s.g].s++; t[s.g].t += tg; t[s.g].g += th;
            if (th > tg) t[s.h].p += 3; else if (th < tg) t[s.g].p += 3; else { t[s.h].p += 1; t[s.g].p += 1; }
        }
    });
    
    if(document.getElementById("spiele-body")) document.getElementById("spiele-body").innerHTML = html;

    let sortiert = Object.values(t).sort((a, b) => {
        if (b.p !== a.p) return b.p - a.p;
        if ((b.t - b.g) !== (a.t - a.g)) return (b.t - b.g) - (a.t - a.g);
        return b.t - a.t;
    });

    let tabHtml = "";
    sortiert.forEach((team, i) => {
        let diff = team.t - team.g;
        let vz = diff > 0 ? "+" : "";
        let col = diff > 0 ? '#4caf50' : diff < 0 ? '#f44336' : '#fff';
        tabHtml += `<tr><td class="centered" style="color:#888;">${i+1}</td><td style="font-weight:bold;">${team.name}</td><td class="centered">${team.s}</td><td class="centered">${team.t}:${team.g}</td><td class="centered" style="color:${col}">${vz}${diff}</td><td class="centered" style="font-weight:bold; color:#00d2ff;">${team.p}</td></tr>`;
    });
    
    if(document.getElementById("tabelle-body")) document.getElementById("tabelle-body").innerHTML = tabHtml;

    // Finalisten berechnen & Slide 3 steuern
    if (sortiert[0] && sortiert[1]) {
        if(document.getElementById("f-team1")) document.getElementById("f-team1").innerText = sortiert[0].name;
        if(document.getElementById("f-team2")) document.getElementById("f-team2").innerText = sortiert[1].name;
    }
    
    let fErg = localStorage.getItem('finale_erg');
    if(document.getElementById("f-ergebnis")) document.getElementById("f-ergebnis").innerText = fErg;
    if(document.getElementById("focus-ort")) document.getElementById("focus-ort").innerText = finaleOrt;
}

berechneAlles();
setInterval(berechneAlles, 3000); // Blitzschnelle Live-Aktualisierung alle 3 Sekunden
