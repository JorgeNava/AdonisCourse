'use strict'

const auth = require("../../../config/auth");

//Se importa el modelo usuario
const User = use('App/Models/User');

class UserController {
    async hello() {
        return "Hello World";
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
