class HTMLService{
	createItemWithValue(titlevalue, country, temp, desc, img) {
		const item = this.createEl('div', 'weather-item')
		const title = this.createEl('div', 'item-city')
		const deg = this.createEl('div', 'item-deg')
		const description = this.createEl('div', 'item-description')
		const features = this.createEl('div', 'features')
		const deleteEl = this.createEl('div', 'item-delete')
		const itemRight = this.createEl('div', 'item-right')
	
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

	createEl(tag, className = '') {
		let createdEl = document.createElement(tag)
		createdEl.classList.add(className)
		return createdEl
	}
}



