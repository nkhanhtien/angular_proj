module.exports = function (server, router) {
  server.get("/v1/admin/roles/get_corporation_roles/:userId", (req, res) => {
    const db = router.db; // Assign the lowdb instance
    let data = find(db, "userroles", req.params["userId"]);
    res.jsonp({
      code: 200,
      data: data !== undefined ? data.roles : data,
      msg: data !== undefined ? "ok" : "error",
    });
    function find(db, collection, userId) {
      const table = db.get(collection);
      return table.value().filter((item) => item.userId + "" === userId)[0];
    }
  });

  server.get("/v1/admin/roles/get_corporation_roles", (req, res) => {
    const db = router.db; // Assign the lowdb instance
    let data = find(db, "roles");
    res.jsonp({
      code: 200,
      data: data,
      msg: data !== undefined ? "ok" : "error",
    });
    function find(db, collection) {
      const table = db.get(collection);
      return table;
    }
  });
};
