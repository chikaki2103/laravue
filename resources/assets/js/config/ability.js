// ability.js
import { AbilityBuilder } from 'casl/ability'
import axios from 'axios';

let ability = new AbilityBuilder();
if (localStorage.getItem('user') !== null) {
 	var user = JSON.parse(localStorage.getItem('user'))
}
// localStorage.clear();
// console.log(user.roles[0])
export default AbilityBuilder.define(can => {
	if (localStorage.getItem('user') !== null) {

	if (user.roles[0].name === 'admin') {
     can(['delete','update'], 'all')
    }else {
    	can(['read'], 'all')
	}
	}
})
