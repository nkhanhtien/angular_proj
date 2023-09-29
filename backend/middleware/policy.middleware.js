const { TestObject } = require("protractor/built/driverProviders");

module.exports = function (server, router) {
  server.get("/v1/admin/policies/get_policies/pre_defined", (req, res) => {
    let data;
    const db = router.db; // Assign the lowdb instance
    data = find(db, "policies");

    if (req.query) {
      data = filterDataBuSearch(data, req.query);
      data = convertDbToCorporationWebList(data);
    }

    res.jsonp({
      code: 200,
      data: data,
      msg: data !== undefined ? "ok" : "error",
    });

    function filterDataBuSearch(data, query) {
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
      description: item.description,
      number_of_categories: item.number_of_categories,
      status: item.status,
      categories: item.category,
    };
  }

  server.get("/v1/admin/policies/get_detail/:id", (req, res) => {
    const db = router.db; // Assign the lowdb instance
    let data = find(db, "policies", req.params["id"]);
    data = convertDbToCorporationWeb(data[0]);
    res.jsonp({
      code: 200,
      data: data,
      msg: data !== undefined ? "ok" : "error",
    });
    function find(db, collection, id) {
      const table = db.get(collection);
      return table.value().filter((item) => item.id === id);
    }
  });

  server.get("/v1/admin/categories/get_categories/pre_defined", (req, res) => {
    const db = router.db; // Assign the lowdb instance
    data = find(db, "categories");
    data = convertDbToCorporationWebCategory(data);
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

  function convertDbToCorporationWebCategory(parentsData) {
    result = {
      total_rows: parentsData.length,
      rows: parentsData,
    };
    return result;
  }
  server.get("/v1/admin/policies/get_policies_by_package/:id", (req, res) => {
    const db = router.db; // Assign the lowdb instance
    let data = find(db, "package", req.params["id"]);
    res.jsonp({
      code: 200,
      data: data,
      msg: data !== undefined ? "ok" : "error",
    });

    function find(db, collection, id) {
      const table = db.get(collection);
      return table.value().filter((item) => item.id === id)[0].policies;
    }
  });
};
