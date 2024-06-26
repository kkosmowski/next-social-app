/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8aa5ymqaj2i69ll")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4sv91pim",
    "name": "comment",
    "type": "relation",
    "required": true,
    "presentable": true,
    "unique": false,
    "options": {
      "collectionId": "at32cwjogsl6tqs",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8aa5ymqaj2i69ll")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4sv91pim",
    "name": "comment",
    "type": "relation",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "at32cwjogsl6tqs",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
})
