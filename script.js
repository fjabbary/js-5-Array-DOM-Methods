const main = document.getElementById('main')
const addUserBtn = document.getElementById('add-user')
const doubleBtn = document.getElementById('double')
const showMillionairesBtn = document.getElementById('show-millionaires')
const sortBtn = document.getElementById('sort')
const calculateWealthBtn = document.getElementById('calculate-wealth')

let dataArr = [];

getRandomUser()
getRandomUser()
getRandomUser()

function updateDOM() {
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>'

    dataArr.forEach(item => {
        const div = document.createElement('div')
        div.classList.add('person')
        div.innerHTML = `${item.name}<strong></strong> $${formatMoney(item.money)}`

        main.appendChild(div)
    })
}

// (12345.67).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
function formatMoney(num) {
    return (num).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}


async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api')
    const data = await res.json();

    const user = data.results[0]

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    }

    dataArr.push(newUser)
    updateDOM()
}

//Event Listerners
addUserBtn.addEventListener('click', () => {
    getRandomUser()
})

doubleBtn.addEventListener('click', () => {
    dataArr = dataArr.map(item => {
        return { ...item, money: item.money * 2 }
    })

    updateDOM()
})

showMillionairesBtn.addEventListener('click', () => {
    const filteredArr = dataArr.filter(item => {
        return item.money > 1000000
    })

    dataArr = filteredArr
    updateDOM();
})

sortBtn.addEventListener('click', () => {
    const sortedArr = dataArr.sort((a, b) => {
        return b.money - a.money
    })

    dataArr = sortedArr;
    updateDOM()
})

calculateWealthBtn.addEventListener('click', () => {
    let sum = 0;
    dataArr.forEach(item => {
        sum += item.money
    })

    const div = document.createElement('div')
    div.classList.add('person')
    div.classList.add('border')
    div.innerHTML = `<strong>Sum</strong> <b>$${formatMoney(sum)}</b>`

    main.appendChild(div)
})