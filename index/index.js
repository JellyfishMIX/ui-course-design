// 可能出现一个页面多个document.body.onload的情况，因此将document.body.onload封装，集中调用
document.body.onload = () => {
    commonBodyOnload();
    setUlRemoveLiMethod();
};

// list-area
const ul = document.getElementById('listAreaUl');

const ulAddLi = () => {
    let newLi = document.createElement('li');
    newLi.innerText = '新增无序节点' + new Date();
    ul.appendChild(newLi);
    setUlRemoveLiMethod();
};

const setUlRemoveLiMethod = () => {
    let lis = ul.getElementsByTagName('li');
    let lisLen = lis.length;
    for (let i = 0; i < lisLen; i++) {
        lis[i].onclick = () => {
            ul.removeChild(lis[i]);
        };
    }
};

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

// select-area

const checkboxes = document.getElementsByName('selectAreaWeek');

const selectAll = () => {
    for (let i = 0; i < checkboxes.length; i++) {
        console.log('test');
        checkboxes[i].checked = true;
    }
};

const unselectAll = () => {
    for (let i = 0; i < checkboxes.length; i++) {
        console.log('test');
        checkboxes[i].checked = false;
    }
};

const antiSelect = () => {
    for (let i = 0; i < checkboxes.length; i++) {
        console.log('test');
        checkboxes[i].checked = !checkboxes[i].checked;
    }
};