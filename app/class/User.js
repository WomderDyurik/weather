class User{
	constructor(login, password){
		this.login = login
		this.password = password
	}

	getUser(){
		return `login: ${this.login} password: ${this.password}`
	}
}