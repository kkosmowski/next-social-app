/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "8aa5ymqaj2i69ll",
    "created": "2024-04-12 07:31:26.640Z",
    "updated": "2024-04-12 07:31:26.640Z",
    "name": "comment_likes",
    "type": "base",
    "system": false,
    "schema": [
      {
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
      },
      {
        "system": false,
        "id": "8pf5aubm",
        "name": "user",
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
      }
    ],
    "indexes": [
      "CREATE UNIQUE INDEX `idx_oHK6PiN` ON `comment_likes` (\n  `comment`,\n  `user`\n)"
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("8aa5ymqaj2i69ll");

  return dao.deleteCollection(collection);
})
