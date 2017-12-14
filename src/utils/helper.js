class Helper {

	getDateString(){
		const date = new Date()
		const fullYear = date.getFullYear()
		const month = (date.getMonth() + 1) > 9 ? ((date.getMonth() + 1) + '') : ('0' + (date.getMonth() + 1))
		const day = date.getDate() > 9 ? date.getDate() : ('0' + date.getDate())
		return fullYear + month + day
	}
}
export default new Helper()
