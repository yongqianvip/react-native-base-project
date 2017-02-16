// var address = require('./address.json')
var address = require('./qaAddress.json')
var count = 0;
var result = address.map(function(provience,index){
	var obj1 = {};
	var pName = provience.v;
	var obj2 = []
	var objTmp = {}

	provience.rl.map(function(city,index){
		console.log("----city" ,city.rl, city.v);
		if (!city.rl) {
			count++;
			console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",city.v);
		};
		// var cName = city.v;
		// var districtArr = []
		// city.rl.map(function(district,index){
		// // 	districtArr.push(district.v)
		// 	console.log(">>>>>>>> ,",district);
		// });
		// var temp = {}
		// temp[cName] = districtArr;
		// obj2.push(temp);

	})
	obj1[pName] = obj2

	return obj1;
})
console.log("-------- ",count);

		// console.log(">>>>>>>>> ",result);
		// console.log(">>>>>>>>> ",result[3]);
		// console.log(">>>>>>>>> ",result[3]["山西省"]);

