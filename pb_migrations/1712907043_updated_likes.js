/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xjw5lvlmmnbn0ex")

  collection.name = "post_likes"
  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_ZaW1sSs` ON `post_likes` (\n  `post`,\n  `user`\n)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xjw5lvlmmnbn0ex")

  collection.name = "likes"
  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_ZaW1sSs` ON `likes` (\n  `post`,\n  `user`\n)"
  ]

  return dao.saveCollection(collection)
})
