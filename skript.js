// HIER DIE ERGEBNISSE EINTRAGEN
const spiele = [
    { d: "Sa. 04.07.2026, 14:00", jsDate: "2026-07-04T14:00:00", h: "TV Mörsch",          g: "1. SV Mörsch",       e: "0:3", o: "FT Forchheim (Bachbergfest)" },
    { d: "So. 05.07.2026, 15:00", jsDate: "2026-07-05T15:00:00", h: "TV Mörsch",          g: "FV Spfr. Forchheim", e: "0:4", o: "FT Forchheim (Bachbergfest)" },
    { d: "So. 05.07.2026, 16:30", jsDate: "2026-07-05T16:30:00", h: "SC Neuburgweier",    g: "FT Forchheim",       e: "5:0", o: "FT Forchheim (Bachbergfest)" },
    { d: "Mi. 08.07.2026, 19:00", jsDate: "2026-07-08T19:00:00", h: "FV Spfr. Forchheim",  g: "SC Neuburgweier",    e: "2:0", o: "FV Spfr. Forchheim" },
    { d: "Sa. 11.07.2026, 18:00", jsDate: "2026-07-11T18:00:00", h: "1. SV Mörsch",       g: "FV Spfr. Forchheim", e: "2:1", o: "1. SV Mörsch (Sportfest)" },
    { d: "Sa. 11.07.2026, 19:30", jsDate: "2026-07-11T19:30:00", h: "FT Forchheim",       g: "TV Mörsch",          e: "1:1", o: "1. SV Mörsch (Sportfest)" },
    { d: "So. 12.07.2026, 17:00", jsDate: "2026-07-12T17:00:00", h: "FV Spfr. Forchheim",  g: "FT Forchheim",       e: "3:0", o: "1. SV Mörsch (Sportfest)" },
    { d: "So. 12.07.2026, 18:30", jsDate: "2026-07-12T18:30:00", h: "1. SV Mörsch",       g: "SC Neuburgweier",    e: "6:1", o: "1. SV Mörsch (Sportfest)" },
    { d: "Do. 16.07.2026, 18:00", jsDate: "2026-07-16T18:00:00", h: "TV Mörsch",          g: "SC Neuburgweier",    e: "0:2", o: "SC Neuburgweier (Jubiläum)" },
    { d: "Do. 16.07.2026, 19:30", jsDate: "2026-07-16T19:30:00", h: "FT Forchheim",       g: "1. SV Mörsch",       e: "0:3", o: "SC Neuburgweier (Jubiläum)" }
];

// HIER DAS FINALE-ERGEBNIS EINTRAGEN (z.B. "2:1")
const finaleErgebnis = "-:-";
const finaleJsDate = "2026-07-22T19:00:00";

function berechneAlles() {
    const jetzt = new Date();
    const heuteString = jetzt.getFullYear() + "-" + String(jetzt.getMonth()+1).padStart(2,'0') + "-" + String(jetzt.getDate()).padStart(2,'0');
    const teams = ["TV Mörsch", "1. SV Mörsch", "FV Spfr. Forchheim", "SC Neuburgweier", "FT Forchheim"];
    
    let t = {};
    teams.forEach(name => { t[name] = { name: name, s: 0, t: 0, g: 0, p: 0 }; });

    let html = "";
    spiele.forEach(s => {
        let spielZeit = new Date(s.jsDate);
        let spielEnde = new Date(spielZeit.getTime() + (105 * 60 * 1000));
        let istGleicherTag = s.jsDate.startsWith(heuteString);
        let cssKlasse = "", badgeHtml = "";

        if (s.e === "-:-") {
            if (jetzt >= spielZeit && jetzt <= spielEnde) {
                cssKlasse = ' class="spiel-live"';
                badgeHtml = '<span class="badge-live">LIVE</span>';
            } else if (istGleicherTag && jetzt < spielZeit) {
                cssKlasse = ' class="spiel-heute"';
                badgeHtml = '<span class="badge-heute">Heute</span>';
            }
        }

        html += `<tr${cssKlasse}><td>${s.d}${badgeHtml}</td><td style="font-weight:bold;">${s.h}</td><td style="font-weight:bold;">${s.g}</td><td class="ergebnis">${s.e}</td><td style="color:#888; font-size:1.3vh;">${s.o}</td></tr>`;
        
        let m = s.e.match(/^(\d+):(\d+)$/);
        if (m && t[s.h] && t[s.g]) {
            let th = parseInt(m[1], 10), tg = parseInt(m[2], 10);
            t[s.h].s++; t[s.h].t += th; t[s.h].g += tg;
            t[s.g].s++; t[s.g].t += tg; t[s.g].g += th;
            if (th > tg) t[s.h].p += 3; else if (th < tg) t[s.g].p += 3; else { t[s.h].p += 1; t[s.g].p += 1; }
        }
    });
    document.getElementById("spiele-body").innerHTML = html;

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
        tabHtml += `<tr><td class="centered" style="color:#888;">${i+1}</td><td style="font-weight:bold;">${team.name}</td><td class="centered">${team.s}</td><td class="centered">${team.t}:${team.g}</td><td class="centered" style="color:${col}">${vz}${diff}</td><td class="centered" style="font-weight:bold; color:#00d2ff; font-size:1.8vh;">${team.p}</td></tr>`;
    });
    document.getElementById("tabelle-body").innerHTML = tabHtml;

    if(sortiert[0]) document.getElementById("finalist-1").innerText = sortiert[0].name;
    if(sortiert[1]) document.getElementById("finalist-2").innerText = sortiert[1].name;

    let fZeit = new Date(finaleJsDate);
    let fEnde = new Date(fZeit.getTime() + (105 * 60 * 1000));
    let fRow = document.getElementById("finale-row-element");
    
    if (finaleErgebnis === "-:-") {
        if (jetzt >= fZeit && jetzt <= fEnde) { fRow.className = "spiel-live"; }
        else if (finaleJsDate.startsWith(heuteString) && jetzt < fZeit) { fRow.className = "spiel-heute"; }
        else { fRow.className = ""; }
    } else { fRow.className = ""; }
}

berechneAlles();
setInterval(berechneAlles, 10000);
