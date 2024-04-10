/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("47sn8h85rbs4cw6")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "t5fuvqnl",
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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("47sn8h85rbs4cw6")

  // remove
  collection.schema.removeField("t5fuvqnl")

  return dao.saveCollection(collection)
})
