class HTMLService{
	paintCity(city){
		return `
		<div class="weather-item">
			<div class="item-city">${city.name}</div>
			<div class="item-right">
				<div class="item-deg">${city.deg}</div>
				<div class="item-description">${city.description}</div>
				<div class="features">
					<img class="item-image" src="${city.image}">
				</div>
				<div class="item-delete">x</div>
			</div>
		</div>
		`
	}

	paintCitys(citys = []){
		return citys.map(this.paintCity).join('')
	}
}