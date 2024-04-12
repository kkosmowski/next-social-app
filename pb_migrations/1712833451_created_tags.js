/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "94ns4muhvxamwak",
    "created": "2024-04-11 11:04:11.856Z",
    "updated": "2024-04-11 11:04:11.856Z",
    "name": "tags",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "cj0tuqzd",
        "name": "name",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [
      "CREATE UNIQUE INDEX `idx_toQ0Dls` ON `tags` (`name`)"
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
  const collection = dao.findCollectionByNameOrId("94ns4muhvxamwak");

  return dao.deleteCollection(collection);
})
