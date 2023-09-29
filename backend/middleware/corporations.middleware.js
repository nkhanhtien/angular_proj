module.exports = function (server, router) {
  server.get("/v1/admin/corporation/", (req, res) => {
    let data;
    var type = req.query["type.equals"];
    const db = router.db; // Assign the lowdb instance
    if (type === "tenants") data = find(db, "corporations");
    else {
      if (type === "organizations") {
        let id = "0";
        data = findDataByParentId(db, "corporations", id);
      } else {
        if (type === "sites") {
          let id = "0";
          orgData = findDataByParentId(db, "corporations", id);
          data = findDataByListParent(db, "corporations", orgData);
        } else if (type === "accounts") {
          let id = "0";
          data = findDataByParentId(db, "corporations", id);
          data = findDataByListParent(db, "corporations", data);
          data = findDataByListParent(db, "corporations", data);
        }
      }
    }
    if (req.query) {
      data = filterDataBuSearch(data, req.query);
      data = convertDbToCorporationWebList(data);
    }

    res.jsonp({
      code: 200,
      data: data,
      msg: data !== undefined ? "ok" : "error",
    });

    function find(db, collection) {
      const table = db.get(collection);
      return table.value().filter((item) => item.vendor_id === "0");
    }

    function filterDataBuSearch(data, query) {
      var corporation_name = query["corporation_name.contains"];
      if (corporation_name) {
        data = data.filter((item) =>
          item.name.toLowerCase().includes(corporation_name.toLowerCase())
        );
      }
      return data;
    }

    function findDataByParentId(db, collection, id) {
      const table = db.get(collection);
      let data = table.value().filter((item) => item.vendor_id === id);
      if (id === "0") {
        data = findDataByListParent(db, collection, data);
      }

      return data;
    }

    function findDataByListParent(db, collection, parentsData) {
      let result = [];
      parentsData.forEach((item) => {
        let a = findDataByParentId(db, collection, item["id"]);
        if (a.length > 0) {
          a.forEach((b) => {
            result.push(b);
          });
        }
      });
      return result;
    }
  });

  server.get("/v1/admin/corporation/get_detail/:id", (req, res) => {
    if (req.params["id"] === "0") {
      res.jsonp({
        code: 200,
        data: "record not found",
        msg: "Failed to get all objects",
      });
    } else {
      const db = router.db; // Assign the lowdb instance
      let data = find(db, "corporations", req.params["id"]);
      let parent = findParent(db, "corporations", data.vendor_id);
      data = convertDbToCorporationWeb(data, parent);
      res.jsonp({
        code: 200,
        data: data,
        msg: data !== undefined ? "ok" : "error",
      });
    }
    function find(db, collection, id) {
      const table = db.get(collection);
      return table.value().filter((item) => item.id === id)[0];
    }

    function findParent(db, collection, vendor_id) {
      const table = db.get(collection);
      return table.value().filter((item) => item.id === vendor_id)[0];
    }
  });

  server.get("/v1/admin/corporation/get_clients/:id", (req, res) => {
    const db = router.db; // Assign the lowdb instance
    let data = find(db, "corporations", req.params["id"]);
    data = convertDbToCorporationWebList(data);
    res.jsonp({
      code: 200,
      data: data,
      msg: data !== undefined ? "ok" : "error",
    });
    function find(db, collection, id) {
      const table = db.get(collection);
      return table.value().filter((item) => item.vendor_id === id);
    }
  });

  function convertDbToCorporationWeb(item, parent) {
    let newcontact = [];

    item.contacts.forEach((itemContact) =>
      newcontact.push({
        address: {
          Street: itemContact.street,
          Province: itemContact.district,
          Country: itemContact.country,
        },
        phone_number: [
          itemContact.phone1,
          itemContact.phone2,
          itemContact.phone3,
        ],
      })
    );
    if (parent === undefined) {
      newItem = {
        id: item.id,
        email: item.email,
        corporation_name: item.name,
        vendor_id: item.vendor_id,
        contact: newcontact,
      };
    } else {
      newItem = {
        id: item.id,
        email: item.email,
        corporation_name: item.name,
        contact: newcontact,
        vendor_id: item.vendor_id,
        vendor_name: parent.name,
      };
    }
    return newItem;
  }
  function convertDbToCorporationWebList(parentsData) {
    let row = [];
    parentsData.forEach((item) =>
      row.push(convertDbToCorporationWeb(item, {}))
    );
    result = {
      total_rows: row.length,
      rows: row,
    };
    return result;
  }
};
