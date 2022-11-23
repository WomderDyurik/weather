const btn = document.querySelector('.weather-btn')
const input = document.querySelector('.weather-input')
const items = document.querySelector('.weather-items')
const cityItems = document.querySelector('.city-items')
const localData = JSON.parse(localStorage.getItem('localData'))


if(localData){
    localData.forEach(el => {
        searchWeather(el.name, el.country)
    })
} else {
    btn.addEventListener('click', createAll)
}




function createAll() {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${input.value}&limit=3&appid=********`)
    .then(function (resp) { return resp.json() })
    .then(function (data) {
        data.forEach(el => {
            searchWeather(el.name, el.country)
        });
        localStorage.setItem('localData',JSON.stringify(data))
    })
    .catch(function () {
        // catch any errors
    });
}

function createItemWithValue(titlevalue, country, temp, desc, img) {
    const item = createEl('div', 'weather-item')
    const title = createEl('div', 'item-city')
    const deg = createEl('div', 'item-deg')
    const description = createEl('div', 'item-description')
    const features = createEl('div', 'features')
    const deleteEl = createEl('div', 'item-delete')
    const itemRight = createEl('div', 'item-right')

    title.textContent = `${titlevalue} ${country}`
    deg.innerHTML = Math.round(temp - 273) + '&deg;';
    description.textContent = desc
    features.innerHTML = `<img class='item-image' src="https://openweathermap.org/img/wn/${img}@2x.png">`;
    itemRight.append(deg, description, features, deleteEl)
    item.append(title, itemRight)
    deleteEl.textContent = 'x'
    items.append(item)

    deleteEl.addEventListener('click', () => {
        item.remove()
    })
}

function createEl(tag, className = '') {
    let createdEl = document.createElement(tag)
    createdEl.classList.add(className)
    return createdEl
}

function searchWeather(name, country){
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${name},${country}&appid=********`)
            .then(function (resp) { return resp.json() })
            .then(data2 => {
                createItemWithValue(name, country, data2.main.temp, data2.weather[0]['description'], data2.weather[0]['icon'])
            })
            .catch(function () {
                // catch any errors
            });
}
