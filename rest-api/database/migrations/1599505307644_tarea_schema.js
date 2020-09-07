'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TareaSchema extends Schema {
  up() {
    this.create('tareas', (table) => {
      table.increments()
      table.integer('project_id').unsigned().references('id').inTable('proyectos')
      table.string('descripcion', 254).notNullable().unique()
      table.timestamps()
    })
  }

  down() {
    this.drop('tareas')
  }
}

module.exports = TareaSchema
