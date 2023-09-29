module.exports = function (server, router) {
  server.get("/v1/admin/packages/get_packages", (req, res) => {
    let data;
    const db = router.db; // Assign the lowdb instance
    data = find(db, "subscription");

    if (req.query) {
      data = filterDataBySearch(data, req.query);
      data = convertDbToCorporationWebList(data);
    }

    res.jsonp({
      code: 200,
      data: data,
      msg: data !== undefined ? "ok" : "error",
    });

    function filterDataBySearch(data, query) {
      var corporation_name = query["name.contains"];
      if (corporation_name) {
        data = data.filter((item) =>
          item.name.toLowerCase().includes(corporation_name.toLowerCase())
        );
      }
      return data;
    }

    function find(db, collection) {
      const table = db.get(collection);
      return table.value();
    }
  });

  function convertDbToCorporationWebList(parentsData) {
    let row = [];
    parentsData.forEach((item) => row.push(convertDbToCorporationWeb(item)));
    result = {
      total_rows: row.length,
      rows: row,
    };
    return result;
  }

  function convertDbToCorporationWeb(item) {
    return {
      id: item.id,
      name: item.name,
      package_type: item.package_type,
      service_type: item.service_type,
      duration_period: item.duration_period,
      duration_length: item.duration_length,
      number_of_user: item.number_of_user,
      price: item.price,
      currency: item.currency,
      status: item.status,
      status_used: item.status_used,
      policies: item.policies,
    };
  }

  server.get("/v1/admin/packages/get_detail/:id", (req, res) => {
    const db = router.db; // Assign the lowdb instance
    let data = find(db, "subscription", req.params["id"]);
    res.jsonp({
      code: 200,
      data: data[0],
      msg: data !== undefined ? "ok" : "error",
    });
    function find(db, collection, id) {
      const table = db.get(collection);
      return table.value().filter((item) => item.id === id);
    }
  });

  server.get("/v1/duration_periods/", (req, res) => {
    const db = router.db; // Assign the lowdb instance
    let data = find(db, "duration_period");
    res.jsonp({
      code: 200,
      data: data,
      msg: data !== undefined ? "ok" : "error",
    });
    function find(db, collection) {
      const table = db.get(collection);
      return table.value();
    }
  });

  server.get("/v1/currencies/", (req, res) => {
    const db = router.db; // Assign the lowdb instance
    let data = find(db, "currency");
    res.jsonp({
      code: 200,
      data: data,
      msg: data !== undefined ? "ok" : "error",
    });
    function find(db, collection) {
      const table = db.get(collection);
      return table.value();
    }
  });
};
