// =========================================================================
// 📥 DIE EINZIGE ZENTRALE DATENQUELLE (Hier alles für das Turnier eintragen)
// =========================================================================
//const standardSpiele = [
//    { id: 1, d: "Mi. 29.07.2026, 10:30", jsDate: "2026-07-29T14:00:00", h: "TV Mörsch",          g: "1. SV Mörsch",       e: "-:-", o: "FT Forchheim (Bachbergfest)" },
//    { id: 2, d: "Mi. 29.07.2026, 11:30", jsDate: "2026-07-29T15:00:00", h: "TV Mörsch",          g: "FV Spfr. Forchheim", e: "-:-", o: "FT Forchheim (Bachbergfest)" },
//    { id: 3, d: "Do. 30.07.2026, 16:30", jsDate: "2026-07-30T16:30:00", h: "SC Neuburgweier",    g: "FT Forchheim",       e: "-:-", o: "FT Forchheim (Bachbergfest)" },
//    { id: 4, d: "Do. 30.07.2026, 19:00", jsDate: "2026-07-30T19:00:00", h: "FV Spfr. Forchheim",  g: "SC Neuburgweier",    e: "-:-", o: "FV Spfr. Forchheim" },
//    { id: 5, d: "Fr. 31.07.2026, 18:00", jsDate: "2026-07-31T18:00:00", h: "1. SV Mörsch",       g: "FV Spfr. Forchheim", e: "-:-", o: "1. SV Mörsch (Sportfest)" },
//    { id: 6, d: "Fr. 31.07.2026, 19:30", jsDate: "2026-07-31T19:30:00", h: "FT Forchheim",       g: "TV Mörsch",          e: "-:-", o: "1. SV Mörsch (Sportfest)" },
//    { id: 7, d: "Sa. 01.08.2026, 17:00", jsDate: "2026-08-01T17:00:00", h: "FV Spfr. Forchheim",  g: "FT Forchheim",       e: "-:-", o: "1. SV Mörsch (Sportfest)" },
//    { id: 8, d: "Sa. 01.08.2026, 18:30", jsDate: "2026-08-01T18:30:00", h: "1. SV Mörsch",       g: "SC Neuburgweier",    e: "-:-", o: "1. SV Mörsch (Sportfest)" },
//    { id: 9, d: "So. 02.08.2026, 18:00", jsDate: "2026-08-02T18:00:00", h: "TV Mörsch",          g: "SC Neuburgweier",    e: "-:-", o: "SC Neuburgweier (Jubiläum)" },
//    { id: 10, d: "So. 02.08.2026, 19:30", jsDate: "2026-08-02T19:30:00", h: "FT Forchheim",       g: "1. SV Mörsch",       e: "-:-", o: "SC Neuburgweier (Jubiläum)" }
//];

const standardSpiele = [
    { id: 1,  d: "Sa. 04.07.2026, 14:00", jsDate: "2026-07-04T14:00:00", h: "TV Mörsch",          g: "1. SV Mörsch",       e: "0:3", o: "FT Forchheim" },
    { id: 2,  d: "So. 05.07.2026, 15:00", jsDate: "2026-07-05T15:00:00", h: "TV Mörsch",          g: "FV Spfr. Forchheim", e: "0:4", o: "FT Forchheim" },
    { id: 3,  d: "So. 05.07.2026, 16:30", jsDate: "2026-07-05T16:30:00", h: "SC Neuburgweier",    g: "FT Forchheim",       e: "5:0", o: "FT Forchheim" },
    { id: 4,  d: "Mi. 08.07.2026, 19:00", jsDate: "2026-07-08T19:00:00", h: "FV Spfr. Forchheim",  g: "SC Neuburgweier",    e: "2:0", o: "FV Spfr. Forchheim" },
    { id: 5,  d: "Sa. 11.07.2026, 18:00", jsDate: "2026-07-11T18:00:00", h: "1. SV Mörsch",       g: "FV Spfr. Forchheim", e: "2:1", o: "1. SV Mörsch" },
    { id: 6,  d: "Sa. 11.07.2026, 19:30", jsDate: "2026-07-11T19:30:00", h: "FT Forchheim",       g: "TV Mörsch",          e: "1:1", o: "1. SV Mörsch" },
    { id: 7,  d: "So. 12.07.2026, 17:00", jsDate: "2026-07-12T17:00:00", h: "FV Spfr. Forchheim",  g: "FT Forchheim",       e: "3:0", o: "1. SV Mörsch" },
    { id: 8,  d: "So. 12.07.2026, 18:30", jsDate: "2026-07-12T18:30:00", h: "1. SV Mörsch",       g: "SC Neuburgweier",    e: "6:1", o: "1. SV Mörsch" },
    { id: 9,  d: "Do. 16.07.2026, 18:00", jsDate: "2026-07-16T18:00:00", h: "TV Mörsch",          g: "SC Neuburgweier",    e: "0:2", o: "SC Neuburgweier" },
    { id: 10, d: "Do. 16.07.2026, 19:30", jsDate: "2026-07-16T19:30:00", h: "FT Forchheim",       g: "1. SV Mörsch",       e: "0:3", o: "SC Neuburgweier" }
];

// Spieldaten für das Finale
const finalKonfiguration = {
    datumUndZeit: "Mi. 22.07.2026, 19:00",
    jsDate: "2026-07-22T19:00:00",
    spielort: "Sportplatz Neuburgweier",
    finale_erg: "1:0"
};

// LocalStorage Setup
if (!localStorage.getItem('turnier_spiele')) { localStorage.setItem('turnier_spiele', JSON.stringify(standardSpiele)); }
if (!localStorage.getItem('finale_erg')) { localStorage.setItem('finale_erg', finalKonfiguration.finale_erg); }

function generiereKioskSystem() {
    const jetzt = new Date();
    const heuteString = jetzt.getFullYear() + "-" + String(jetzt.getMonth()+1).padStart(2,'0') + "-" + String(jetzt.getDate()).padStart(2,'0');
    const teams = ["TV Mörsch", "1. SV Mörsch", "FV Spfr. Forchheim", "SC Neuburgweier", "FT Forchheim"];
    
    let t = {};
    teams.forEach(name => { t[name] = { name: name, s: 0, t: 0, g: 0, p: 0 }; });

    let spieleListe = JSON.parse(localStorage.getItem('turnier_spiele'));
    let vorrundeAbgeschlossen = true;

    // 1. Berechnung der Vorrundentabelle & HTML für Spielplan generieren
    let alleSpieleHtmls = [];
    spieleListe.forEach(s => {
        if (s.e === "-:-") vorrundeAbgeschlossen = false;

        let spielZeit = new Date(s.jsDate);
        let spielEnde = new Date(spielZeit.getTime() + (105 * 60 * 1000));
        let istGleicherTag = s.jsDate.startsWith(heuteString);
        let statusKlasse = "spiel-row", badgeHtml = "";

        if (s.e === "-:-") {
            if (jetzt >= spielZeit && jetzt <= spielEnde) { statusKlasse += " live"; badgeHtml = ' <span class="badge-live">LIVE</span>'; }
            else if (istGleicherTag && jetzt < spielZeit) { statusKlasse += " heute"; badgeHtml = ' <span class="badge-heute">Heute</span>'; }
        }

        let sHtml = `<div class="${statusKlasse}">
            <div class="spiel-zeit">${s.d}${badgeHtml}</div>
            <div class="spiel-paarung">${s.h} - ${s.g}</div>
            <div class="spiel-erg">${s.e}</div>
            <div class="spiel-ort">${s.o}</div>
        </div>`;
        alleSpieleHtmls.push(sHtml);

        let m = s.e.match(/^(\d+):(\d+)$/);
        if (m && t[s.h] && t[s.g]) {
            let th = parseInt(m[1], 10), tg = parseInt(m[2], 10);
            t[s.h].s++; t[s.h].t += th; t[s.h].g += tg;
            t[s.g].s++; t[s.g].t += tg; t[s.g].g += th;
            if (th > tg) t[s.h].p += 3; else if (th < tg) t[s.g].p += 3; else { t[s.h].p += 1; t[s.g].p += 1; }
        }
    });

    // Sortierung Tabelle
    let sortiert = Object.values(t).sort((a, b) => {
        if (b.p !== a.p) return b.p - a.p;
        if ((b.t - b.g) !== (a.t - a.g)) return (b.t - b.g) - (a.t - a.g);
        return b.t - a.t;
    });

    // HTML-Struktur-Zusammenstellung
    let container = document.getElementById("slides-container");
    container.innerHTML = ""; // Reset
    
    let verfuegbareSlides = [];
    let verfuegbareTitel = [];

    // --- SLIDE 1: TABELLE ---
    let tabHtml = `<div class="slide" id="slide-tabelle"><table class="big-table"><thead><tr><th class="centered">Pl.</th><th>Mannschaft</th><th class="centered">Sp.</th><th class="centered">Tore</th><th class="centered">Diff.</th><th class="centered">Punkte</th></tr></thead><tbody>`;
    sortiert.forEach((team, i) => {
        let diff = team.t - team.g;
        let vz = diff > 0 ? "+" : "";
        let col = diff > 0 ? '#4caf50' : diff < 0 ? '#f44336' : '#fff';
        tabHtml += `<tr><td class="centered" style="color:#888;">${i+1}</td><td style="font-weight:bold;">${team.name}</td><td class="centered">${team.s}</td><td class="centered">${team.t}:${team.g}</td><td class="centered" style="color:${col}">${vz}${diff}</td><td class="centered" style="font-weight:bold; color:#00d2ff;">${team.p}</td></tr>`;
    });
    tabHtml += `</tbody></table></div>`;
    container.innerHTML += tabHtml;
    verfuegbareSlides.push("slide-tabelle");
    verfuegbareTitel.push("Aktuelle Blitztabelle");

    // --- SLIDES 2+: SPIELPLAN (Aufgeteilt in 5er Pakete) ---
    const spieleProSeite = 5;
    let seitenAnzahl = Math.ceil(alleSpieleHtmls.length / spieleProSeite);
    for(let i=0; i<seitenAnzahl; i++) {
        let slideId = `slide-spielplan-${i}`;
        let slice = alleSpieleHtmls.slice(i * spieleProSeite, (i + 1) * spieleProSeite);
        let spHtml = `<div class="slide" id="${slideId}">${slice.join("")}</div>`;
        container.innerHTML += spHtml;
        verfuegbareSlides.push(slideId);
        verfuegbareTitel.push(`Spielplan (Seite ${i+1}/${seitenAnzahl})`);
    }

    // --- SLIDE LETZTE: FINALE FOCUS ---
    let erster = vorrundeAbgeschlossen ? sortiert[0].name : "Qualifikation läuft...";
    let zweiter = vorrundeAbgeschlossen ? sortiert[1].name : "Qualifikation läuft...";
    let fErgebnis = localStorage.getItem('finale_erg');
    
    // Zeitberechnung für Finale-Live-Modus
    let fZeit = new Date(finalKonfiguration.jsDate);
    let fEnde = new Date(fZeit.getTime() + (105 * 60 * 1000));
    let fKlasse = "focus-box";
    if (fErgebnis === "-:-") {
        if (jetzt >= fZeit && jetzt <= fEnde) fKlasse += " live";
    }

    let finHtml = `<div class="slide" id="slide-finale">
        <div class="${fKlasse}">
            <div class="focus-title">Großes Finale</div>
            <div class="focus-teams" style="color: ${vorrundeAbgeschlossen ? '#ff4d4d' : '#888'}">${erster} vs. ${zweiter}</div>
            <div><span class="focus-score">${fErgebnis}</span></div>
            <div class="focus-info">Wann: ${finalKonfiguration.datumUndZeit} | Ort: ${finalKonfiguration.spielort}</div>
        </div>
    </div>`;
    container.innerHTML += finHtml;
    verfuegbareSlides.push("slide-finale");
    verfuegbareTitel.push("Match Fokus - Endspiel");

    // Steuerung an index.html übergeben
    if(typeof initialisiereWechsel === "function") {
        initialisiereWechsel(verfuegbareSlides, verfuegbareTitel);
    }
}

// System zünden
generiereKioskSystem();
