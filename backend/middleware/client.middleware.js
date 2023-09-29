module.exports = function (server, router) {
  server.get("/clients/:id", (req, res) => {
    const db = router.db; // Assign the lowdb instance
    let data = find(db, "clients", req.params["id"]);

    res.jsonp({
      code: 200,
      data: data,
      msg: data !== undefined ? "ok" : "error",
    });
    function find(db, collection, id) {
      const table = db.get(collection);
      return table.value().filter((item) => item.id + "" === id)[0];
    }
  });

  server.get("/clients", (req, res) => {
    const db = router.db; // Assign the lowdb instance
    let data = db.get(collection).value();

    res.jsonp({
      code: 200,
      data: data,
      msg: data !== undefined ? "ok" : "error",
    });
  });
};
