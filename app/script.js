const btn = document.querySelector('.weather-btn')
const input = document.querySelector('.weather-input')
const items = document.querySelector('.weather-items')
const cityItems = document.querySelector('.city-items')

btn.addEventListener('click', () => {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${input.value}&limit=3&appid=********`)
    .then(function (resp) { return resp.json() })
    .then(function (data) {
        data.forEach(el => {
            const cityItem = createEl('div', 'city-item')
            cityItems.append(cityItem)
            cityItem.textContent = `${el.name}, ${el.country}`
            cityItem.addEventListener('click', () => {
                searchWeather(el.name, el.country)
            })
            input.addEventListener('focusin', () => {
                cityItem.remove()
            })
        });
        
    })
    .catch(function () {
        // catch any errors
    });
})




function createItemWithValue(titlevalue,temp,desc,img) {
    const item = createEl('div', 'weather-item')
    const title = createEl('div', 'item-city')
    const deg = createEl('div', 'item-deg')
    const description = createEl('div', 'item-description')
    const features = createEl('div', 'features')
    const deleteEl = createEl('div', 'item-delete')


    title.textContent = titlevalue
    deg.innerHTML = Math.round(temp - 273) + '&deg;';
    description.textContent = desc
    features.innerHTML = `<img class='item-image' src="https://openweathermap.org/img/wn/${img}@2x.png">`;
    items.append(item)
    item.append(title, deg, description, features, deleteEl)
    deleteEl.textContent = 'x'

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
            .then(function (data) {
                createItemWithValue(input.value, data.main.temp, data.weather[0]['description'], data.weather[0]['icon'])
            })
            .catch(function () {
                // catch any errors
            });
}