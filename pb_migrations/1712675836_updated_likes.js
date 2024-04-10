/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xjw5lvlmmnbn0ex")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_ZaW1sSs` ON `likes` (\n  `post_id`,\n  `user_id`\n)"
  ]

  // remove
  collection.schema.removeField("ltckgp5j")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fyv8lex3",
    "name": "post_id",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "3kqotweg",
    "name": "user_id",
    "type": "relation",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xjw5lvlmmnbn0ex")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_pbgNUec` ON `likes` (`post_id`)"
  ]

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ltckgp5j",
    "name": "post_id",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // remove
  collection.schema.removeField("fyv8lex3")

  // remove
  collection.schema.removeField("3kqotweg")

  return dao.saveCollection(collection)
})
