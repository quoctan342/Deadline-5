var selectBirthYearElement = document.getElementById("listSelectBirthYear");
var fullNameElement = document.getElementById("fullName");
var maleElement = document.getElementById("male");
var femaleElement = document.getElementById("female");
var otherElement = document.getElementById("other");
var buttonAddElement = document.getElementById("buttonAddUser");
var listUsers = (JSON.parse(localStorage.getItem('user')) ?? [])
var tableDataElemet = document.getElementById("table-data");
var filterListYear = document.getElementById("listFilterYear");
var filterBySexElement = document.getElementById("filterBySex");
var sortByProperty = document.getElementById("sortByProperty");
var sortAscDec = document.getElementById("sortAscDec");

function filterIdenticalElement(arr) {
    var newArr = []
    newArr = arr.filter(function (item) {
        return newArr.includes(item) ? '' : newArr.push(item)
    })
    return newArr
} 

function clearForm() {
    fullNameElement.value = "";
    selectBirthYearElement.selectedIndex = 0;
    if (femaleElement.checked) {
        femaleElement.checked = false;
        maleElement.checked = true;
    } else if (otherElement.checked) {
        otherElement.checked = false;
        maleElement.checked = true;
    }
}

function showData(data) {
    var htmls = data.map(function(value, key) {
        return `
            <tr onmouseover="ShowButtonDelete(event)" onmouseout="HideButtonDelete(event)" id="product-${key}">
                <th scope="row">${key + 1}</th>
                <td>${value.fullName}</td>
                <td>${value.birthYear}</td>
                <td>${value.sex}</td>
                <td>${value.timeCreate}</td>
                <td><button type="button" class="btn btn-danger visually-hidden">X</button></td>
            </tr>
        `
    })

    tableDataElemet.innerHTML = htmls.join('');
}

showData(listUsers);

//add years (from 1990 to 2022) to select list birthyear
for (var i = 1990; i < 2023; i++) {
    let option = document.createElement("option");
    option.value = i;
    option.text = i.toString();
    selectBirthYearElement.add(option);
}
////////////////////

//add years in localStorage to select list filter birthyear
var yearsFilter = listUsers.map(function(value) {
    return value.birthYear;
})
yearsFilter = filterIdenticalElement(yearsFilter);

for (var key in yearsFilter) {
    let option = document.createElement("option");
    option.value = yearsFilter[key];
    option.text = yearsFilter[key].toString();
    filterListYear.add(option);
}
////////////////

buttonAddElement.onclick = function() {
    var today = new Date();
    if (maleElement.checked) {
        var sexValue = "Nam";
    } else if (femaleElement.checked) {
        var sexValue = "Nữ";
    } else {
        var sexValue = "Khác";
    }
    var data = {
        fullName: fullNameElement.value,
        birthYear: selectBirthYearElement.value,
        sex: sexValue,
        timeCreate: today,
    }

    var users = [...listUsers, data];
    localStorage.setItem('user', JSON.stringify(users));
    listUsers = (JSON.parse(localStorage.getItem('user')) ?? []);  
    clearForm();
    showData(listUsers)
    if (!yearsFilter.includes(data.birthYear.toString())) {
        yearsFilter.push(data.birthYear.toString());
        let option = document.createElement("option");
        option.value = data.birthYear;
        option.text = data.birthYear.toString();
        filterListYear.add(option);
    }
}   

filterListYear.onchange = function () {
    let listFilted = listUsers.filter(function (value) {
        return value.birthYear === filterListYear.value;
    })
    if (filterListYear.selectedIndex === 0) {
        showData(listUsers)
    } else {
        showData(listFilted);
    }
}


filterBySexElement.onchange = function () {
    let listFilted = listUsers.filter(function (value) {
        return value.sex === filterBySexElement.value;
    })
    if (filterBySexElement.selectedIndex === 0) {
        showData(listUsers)
    } else {
        showData(listFilted);
    }
    console.log(filterBySexElement.value)
}

sortByProperty.onchange = function () {
    let listSorted;
    if (sortAscDec.value === "asc") {
        listSorted = listUsers.sort(function (a, b) {
            return a[sortByProperty.value] - b[sortByProperty.value];
        })
    } else {
        listSorted = listUsers.sort(function (a, b) {
            return b[sortByProperty.value] - a[sortByProperty.value];
        })
    }
    
    showData(listSorted)
}

sortAscDec.onchange = function () {
    let listSorted;
    if (sortAscDec.value === "asc") {
        listSorted = listUsers.sort(function (a, b) {
            return a[sortByProperty.value] - b[sortByProperty.value];
        })
    } else {
        listSorted = listUsers.sort(function (a, b) {
            return b[sortByProperty.value] - a[sortByProperty.value];
        })
    }
    
    showData(listSorted)
}

function ShowButtonDelete(event) {
    let parent = event.target.parentElement;
    parent.lastElementChild.firstElementChild.classList.remove("visually-hidden")    
}

function HideButtonDelete(event) {
    let parent = event.target.parentElement;
    parent.lastElementChild.firstElementChild.classList.add("visually-hidden")    
}