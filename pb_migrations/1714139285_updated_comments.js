/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("at32cwjogsl6tqs")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "6g0wbmtj",
    "name": "post",
    "type": "relation",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "47sn8h85rbs4cw6",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("at32cwjogsl6tqs")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "6g0wbmtj",
    "name": "post",
    "type": "relation",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "47sn8h85rbs4cw6",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
})