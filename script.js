const queryString = window.location.search;
const params = new URLSearchParams(queryString);

const list = document.getElementById("meatFridays");
const inputBox = document.getElementById("easter");
const easter = params.get("easter");
// for date inputs
if (inputBox.type === "date") {
    var easterDD = parseInt(easter.slice(8, 10));
    var easterMM = parseInt(easter.slice(5, 7)) - 1;
    var year = parseInt(easter.slice(0, 4));
} // text inputs
else if (inputBox.type === "text") {
    var easterDD = parseInt(easter.slice(0, 2));
    var easterMM = parseInt(easter.slice(2, 4)) - 1;
    var year = parseInt(easter.slice(4, 8));
} 
const solemnities = [
    "the Blessed Virgin Mary",
    "the Epiphany of Our Lord",
    "St Joseph",
    "the Annunciation",
    "Easter Friday (Easter Octave)",
    "the Sacred Heart of Jesus",
    "John the Baptist",
    "Saints Peter & Paul",
    "the Assumption",
    "All Saints Day",
    "the Immaculate Conception",
    "Christmas"
];
const solemnityDates = [
    "0101",
    "0601",
    "1903",
    "2503",
    "0500",
    "6800",
    "2406",
    "2906",
    "1508",
    "0111",
    "0812",
    "2512"
];
const len = solemnities.length;

function switchInput() {
    if (inputBox.type === "date") {
        inputBox.type = "text";
        inputBox.placeholder = "DDMMYYYY"
        inputBox.value = ""
        console.log("Switched to text")
    } else if (inputBox.type === "text") {
        inputBox.type = "date";
        inputBox.placeholder = ""
        inputBox.value = ""
        console.log("Switched to date")
    }
}

function checkFridays() {
    list.innerHTML = "";
    for (let i = 0; i < len; i++) {
        if (i === 4 || i === 5) {
            const offsetDays = parseInt(solemnityDates[i].slice(0, 2));
            const date = new Date(
                year,
                easterMM,
                easterDD + offsetDays
            );
            const day = date.getDay();
            if (day === 5) { // Friday
                const dd = date.getDate();
                const mm = date.getMonth() + 1;
                list.innerHTML += `${dd}/${mm} (Solemnity of ${solemnities[i]})<br>`;
            }
        } else {
            const solemnityDD = parseInt(
                solemnityDates[i].slice(0, 2)
            );
            const solemnityMM = parseInt(solemnityDates[i].slice(2, 4)) - 1;
            const date = new Date(
                year,
                solemnityMM,
                solemnityDD
            );
            const day = date.getDay();
            if (day === 5) {
                list.innerHTML += `${solemnityDD}/${solemnityMM + 1} (Solemnity of ${solemnities[i]})<br>`;
            }
        }
    }
}

checkFridays();
