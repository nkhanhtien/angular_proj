const { TestObject } = require("protractor/built/driverProviders");

module.exports = function (server, router) {
  server.get("/v1/admin/packages/get_packages/:type", (req, res) => {
    const db = router.db; // Assign the lowdb instance
    let data = find(db, "package", req.params["type"]);
    data = convertDbToCorporationWebList(data);
    res.jsonp({
      code: 200,
      data: data,
      msg: data !== undefined ? "ok" : "error",
    });

    function find(db, collection, type) {
      if (type === "bought") {
        const table = db.get(collection);
        return table.value();
      }
      return null;
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
      currency: item.currency,
      status: item.status,
      status_used: item.status_used,
      policies: item.policies,
    };
  }
};
