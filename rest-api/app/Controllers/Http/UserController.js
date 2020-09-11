'use strict'

const auth = require("../../../config/auth");

//Se importa el modelo usuario
const User = use('App/Models/User');

class UserController {
    async test() {
        let test_obj = {
            "data 0": "content 0",
            "data 1": "content 1",
            "data 2": "content 2",
            "data 3": "content 3",
            "data 4": "content 4",
            "data 5": "content 5",
        };
        return test_obj;
    }
    async hello() {
        return "Hola Nava ya la armaste :)"
    }
    //Obtenemos datos JSON
    async login({ request, auth }) {
        const { email, password } = request.all();
        const token = await auth.attempt(email, password);
        return token
    }
    async store({ request }) {
        const { email, password } = request.all();

        console.log(email, " ", password);

        //Creamos usuario
        const user = await User.create({
            email,
            password,
            username: email
        });
        return this.login(...arguments);
    };
}

module.exports = UserController
