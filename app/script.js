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
                createItem(input.value, data.main.temp, data.weather[0]['description'], data.weather[0]['icon'])
            })
            .catch(function () {
                // catch any errors
            });
    })
    .catch(function () {
        // catch any errors
    });
})

function createItem(title,temp,desc,img) {
    const item = document.createElement('div')
    item.classList.add('weather-item')
    items.append(item)
    const title2 = document.createElement('div')
    title2.classList.add('item-city')
    title2.textContent = title
    const deg2 = document.createElement('div')
    deg2.classList.add('item-deg')
    deg2.innerHTML = Math.round(temp - 273) + '&deg;';
    const description2 = document.createElement('div')
    description2.classList.add('item-description')
    description2.textContent = desc
    const features2 = document.createElement('ul')
    features2.classList.add('features')
    const li2 = document.createElement('li')
    const delete2 = document.createElement('div')
    delete2.classList.add('item-delete')
    delete2.textContent = 'x'
    features2.append(li2)
    features2.innerHTML = `<img class='item-image' src="https://openweathermap.org/img/wn/${img}@2x.png">`;
    item.append(title2, deg2, description2, features2, delete2)
}
