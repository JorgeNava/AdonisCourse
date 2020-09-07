'use strict'

const Proyecto = use('App/Models/Proyecto')

class ProyectoController {

    /*  El metodo index nos mostrara la lista de todos los Proyectos
    *   Usaremos get para obtener la info
    */
    async index({ auth }) {
        //Almacenamos el usuario que esta ingresado para manipularlo
        const user = await auth.getUser();
        /*
        *   Devolvemos todos los proyectos del usuario,
        *   los proyectos son declarados en el modelo del 
        *   usuario.
        */
        return await user.proyectos().fetch();


        /*
        *   Comprobar datos e ingreso al metodo index
        console.log(user.id);
        return {
            mensaje: "Hola estamos en index de proyecto!"
        }
        */
    }

    async create({ request, auth }) {
        const user = await auth.getUser();
        const { nombre, user_id } = request.all();
        const proyecto = new Proyecto();
        /* 
        *   Si solo fuera un dato:
        proyecto.nombre = nombre;
        */
        proyecto.fill({
            nombre
        });
        await user.proyectos().save(proyecto);
        return proyecto;
    }

    async destroy({ response, auth, params }) {
        const user = await auth.getUser();
        const { id } = params;
        const proyecto = await Proyecto.find(id);
        if (proyecto.user_id != user.id) {
            return response.status(403).json({
                mensaje: "Usted no es dueño de este proyecto!"
            })
        }
        await proyecto.delete();
        return proyecto;
    }
}

module.exports = ProyectoController
