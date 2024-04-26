/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("at32cwjogsl6tqs")

  // remove
  collection.schema.removeField("33tvbkve")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("at32cwjogsl6tqs")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "33tvbkve",
    "name": "comment",
    "type": "relation",
    "required": false,
    "presentable": false,
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
})
