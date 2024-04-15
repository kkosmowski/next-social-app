/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("94ns4muhvxamwak")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cavt47ch",
    "name": "post",
    "type": "relation",
    "required": false,
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
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("94ns4muhvxamwak")

  // remove
  collection.schema.removeField("cavt47ch")

  return dao.saveCollection(collection)
})
