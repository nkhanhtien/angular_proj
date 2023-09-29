module.exports = function (server, router) {
  server.get("/v1/countries/regions/:id", (req, res) => {
    const db = router.db; // Assign the lowdb instance
    let data = find(db, "regions", req.params["id"]);
    res.jsonp({
      code: 200,
      data: data,
      msg: data.length > 0 !== undefined ? "ok" : "error",
    });
    function find(db, collection, id) {
      const table = db.get(collection);
      let data = table.value().filter((item) => item.id + "" === id);
      if (data.length > 0) {
        return data[0].region;
      }
      return [];
    }
  });
};
