// table-area
let tableArray = [
    ['23101', '12', '喜羊羊', 'A'],
    ['11301', '07', '美羊羊', 'B']
];

const tableArea1801Class = document.getElementById('tableArea1801Class');

function tableAreaAddRow(baseTable) {
    const iLen = tableArray.length;
    for (let i = 0; i < iLen; i++) {
        const row = baseTable.insertRow();
        const jArray = tableArray[i];
        const jLen = jArray.length;
        for (let j = 0; j < jLen; j++) {
            let cell = row.insertCell();
            cell.innerHTML = jArray[j];
        }
    }
    tableArea1801Class.setAttribute('rowspan', tableArea1801Class.getAttribute('rowspan') + 2);
}