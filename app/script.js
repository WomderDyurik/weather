const btn = document.querySelector('.weather-btn')
const input = document.querySelector('.weather-input')
const items = document.querySelector('.weather-items')
const cityItems = document.querySelector('.city-items')
const localData = JSON.parse(localStorage.getItem('localData'))
const dataItems = []
const htmlService = new HTMLService()
const citys = []


if(localData){
    localData.forEach(el => {
        searchWeather(el.name, el.country)
    })
} 

btn.addEventListener('click', createAll)

function createAll() {
    while(items.firstChild){
        items.removeChild(items.firstChild)
    }
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${input.value}&limit=3&appid=********`)
    .then(function (resp) { return resp.json() })
    .then(function (data) {
        localStorage.clear()
        for(let i = 0; i < 2; i++){
            if(data[i].country == data[i + 1].country){
                delete data[i]
            }
        }
        data.forEach(el => {
            searchWeather(el.name, el.country)
            dataItems.push({
                'name' : el.name,
                'country' : el.country
            })
        });
        localStorage.setItem('localData',JSON.stringify(dataItems))
    })
    .catch((error) => {
        alert('Try to spell the city correctly')
    })
    
}

function searchWeather(name='', country=''){
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${name},${country}&appid=********`)
            .then(function (resp) { return resp.json() })
            .then(data2 => {
                citys.push(data2)
                htmlService.createItemWithValue(name, country, data2.main.temp, data2.weather[0]['description'], data2.weather[0]['icon'])
            })
}

// profile
const profile = document.querySelector('.header__profile-image')
const btnProfile = document.querySelector('.profile-pop-button')
const inputLogin = document.getElementById('login')
const inputPassword = document.getElementById('password')
const headerPop = document.querySelector('.header__pop')

const logindata = JSON.parse(localStorage.getItem('loginData'))



profile.addEventListener('click', showLogIn)


if(logindata){
    profile.removeEventListener('click', showLogIn)
    profile.addEventListener('click', showHistory)
    const loginProfile = createEl('div', 'header__pop-login')
    loginProfile.innerText = logindata.login
    headerPop.append(loginProfile)
} 

btnProfile.addEventListener('click', (e) => {
    e.preventDefault()
        const userData = {
            'login' : inputLogin.value,
            'password' : inputPassword.value,
        }
        localStorage.setItem('loginData',JSON.stringify(userData))
        showLogIn()
})

const cityNames = localStorage.getItem('citys')
console.log(cityNames)

if(cityNames){
    const cityName = createEl('div', 'header__pop-city')
    cityName.innerText = cityNames
    headerPop.append(cityName)
}

function showLogIn(){
    document.querySelector('.profile-pop').classList.toggle('show')
}
function showHistory(){
    headerPop.classList.toggle('show')
}