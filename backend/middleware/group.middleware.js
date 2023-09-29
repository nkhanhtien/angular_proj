module.exports = function (server, router) {
  server.get(
    "/v1/admin/groups/get_groups_by_corporation/:corporationId",
    (req, res) => {
      let data;
      const corporationId = req.params["corporationId"];
      const db = router.db; // Assign the lowdb instance
      data = find(db, "group", corporationId);
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

      function find(db, collection, corporationId) {
        const table = db.get(collection);
        return table
          .value()
          .filter((item) => item.corporation_id === corporationId);
      }
    }
  );

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
      group_name: item.group_name,
      package_id: item.package_id,
      package_name: item.package_name,
      number_of_users: item.user.length,
      policies: item.policies,
      created_at: item.created_at,
    };
  }

  server.get("/v1/admin/groups/get_detail/:id", (req, res) => {
    const db = router.db; // Assign the lowdb instance
    let data = find(db, "group", req.params["id"]);
    res.jsonp({
      code: 200,
      data: convertDbToCorporationWeb(data[0]),
      msg: data !== undefined ? "ok" : "error",
    });
    function find(db, collection, id) {
      const table = db.get(collection);
      return table.value().filter((item) => item.id === id);
    }
  });

  server.get("/v1/admin/groups/get_members/:id", (req, res) => {
    const db = router.db; // Assign the lowdb instance
    let data = find(db, "group", req.params["id"]);
    res.jsonp({
      code: 200,
      data: {
        total_rows: data.length,
        rows: data,
      },
      msg: data !== undefined ? "ok" : "error",
    });
    function find(db, collection, id) {
      const table = db.get(collection);
      return table.value().filter((item) => item.id === id)[0].user;
    }
  });
};
