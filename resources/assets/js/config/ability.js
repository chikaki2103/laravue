// // ability.js
import { AbilityBuilder } from 'casl/ability'
// import axios from 'axios';

// let ability = new AbilityBuilder();
// if (localStorage.getItem('user') !== null) {
//  	var user = JSON.parse(localStorage.getItem('user'))
// }
// // localStorage.clear();
// // console.log(user.roles[0])
// export default AbilityBuilder.define(can => {
// 	if (localStorage.getItem('user') !== null) {

// 	if (user.roles[0].name === 'admin') {
//      can(['delete','update'], 'all')
//     }else {
//     	can(['read'], 'all')
// 	}
// 	}
// })
const casl = require("casl/ability");

export default function defineRulesFor(role,permission) {
   return casl.AbilityBuilder.define(can => {
           // if (localStorage.getItem('user') !== null) {
              
               // if (role == 'admin') {
                
               //     can(['delete', 'update'], 'user');

               // }
               // else {
                 
               //     can(['read'], 'user');
               // }
               console.log(permission);
              can(permission, 'user');
             //   for (var i = 0; i <= role.length; i++) {
             //    switch (role[i]) {
             //    case 'admin':
             //   		can(localStorage.getItem("permissions"), 'Post');
             //   		break;
           		// case 'user':
           		//  can('read', 'Post');
           		// break;
             //   	default:
             //   		// statements_def
             //   		break;
             //   }


             //   }
              
               // switch(role){
               //     case 'user':
               //         can('read', 'Post');
               //         console.log('user');
               //         break;
               //     case 'admin':
               //         can('read', 'Post');
               //         console.log('admin');
               //         can(['update', 'delete'], 'Post');
               //         break;
               // }
           // }
       }
   );
};