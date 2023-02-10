migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("dq062lb1vvho879");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "dq062lb1vvho879",
    "created": "2023-02-06 14:19:53.950Z",
    "updated": "2023-02-10 08:08:42.585Z",
    "name": "exercises",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "gyqbldf8",
        "name": "name",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "di4y9dof",
        "name": "sets",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "ftembfk8",
        "name": "reps",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "kteg1cvy",
        "name": "user",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "maxSelect": null,
          "displayFields": []
        }
      }
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})
