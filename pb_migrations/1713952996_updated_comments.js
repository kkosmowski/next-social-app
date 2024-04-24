/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("at32cwjogsl6tqs")

  // remove
  collection.schema.removeField("ve26fumi")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "li4halqy",
    "name": "likes",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "8aa5ymqaj2i69ll",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("at32cwjogsl6tqs")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ve26fumi",
    "name": "likes",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "xjw5lvlmmnbn0ex",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  // remove
  collection.schema.removeField("li4halqy")

  return dao.saveCollection(collection)
})
