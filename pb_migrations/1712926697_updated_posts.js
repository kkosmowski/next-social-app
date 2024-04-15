/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("47sn8h85rbs4cw6")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qbag9ime",
    "name": "tags",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("47sn8h85rbs4cw6")

  // remove
  collection.schema.removeField("qbag9ime")

  return dao.saveCollection(collection)
})
