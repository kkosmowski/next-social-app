/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("47sn8h85rbs4cw6")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "73d32c2f",
    "name": "tags",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "94ns4muhvxamwak",
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
  collection.schema.removeField("73d32c2f")

  return dao.saveCollection(collection)
})
