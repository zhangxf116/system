import addressJson from './address.json';

let addressArr = [];

for(let i in addressJson) {
	let obji = {
		label: i,
		value: i,
		children: []
	};

	for(let ii in addressJson[i]) {

		let objii = {
			label: ii,
			value: ii,
			children: []
		};
		
		for(let iii in addressJson[i][ii]) {
			objii.children.push({label: addressJson[i][ii][iii], value: addressJson[i][ii][iii]});
		}

		obji.children.push(objii);
	}
	addressArr.push(obji);
}

export default addressArr;