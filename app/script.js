const btn = document.querySelector('.weather-btn')
const input = document.querySelector('.weather-input')
const items = document.querySelector('.weather-items')

btn.addEventListener('click', () => {
    console.log(input.value)
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${input.value},ru&limit=1&appid=************`)
    .then(function (resp) { return resp.json() })
    .then(function (data) {
        console.log(data[0].name)
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${data[0].name},ru&appid=************`)
            .then(function (resp) { return resp.json() })
            .then(function (data) {
                createItemWithValue(input.value, data.main.temp, data.weather[0]['description'], data.weather[0]['icon'])
            })
            .catch(function () {
                // catch any errors
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
        items.remove(item)
    })
}

function createEl(tag, className = '') {
    let createdEl = document.createElement(tag)
    createdEl.classList.add(className)
    return createdEl
}

