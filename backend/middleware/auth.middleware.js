module.exports = function (server, router) {
  server.post("/v1/admin/login", (req, res) => {
    const db = router.db; // Assign the lowdb instance
    let data = find(db, "users", req.body);
    res.jsonp({
      code: 200,
      data: data,
      msg: data !== undefined ? "ok" : "error",
    });
    function find(db, collection, data) {
      const table = db.get(collection);
      var user = table
        .find({ email: data.email, password: data.password })
        .value();
      if (user) {
        var roleId = db.get("userroles").find({ userId: user.id }).value()
          .roleId;
        var role = db.get("roles").find({ id: roleId }).value();
        user.refresh_token = generateRefreshToken();
        return {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          refresh_token: user.refresh_token,
          roles: role,
          access_token: generateJwtToken(),
          corporation_id: user.corporation_id,
        };
      } else return undefined;
    }
  });

  server.post("/v1/admin/refresh", (req, res) => {
    const db = router.db; // Assign the lowdb instance
    let data = find(db, "users", req.body);
    if (data) {
      res.jsonp({
        code: 200,
        data: data,
        msg: data !== undefined ? "ok" : "error",
      });
    } else {
      res.jsonp({
        code: 401,
        data: data,
        msg: "error",
      });
    }

    function find(db, collection, data) {
      const table = db.get(collection);
      var user = table.find({ refresh_token: data.refresh_token }).value();
      if (user) {
        user.refresh_token = generateRefreshToken();
        return {
          refresh_token: user.refresh_token,
          access_token: generateJwtToken(),
        };
      } else return null;
    }
  });

  function generateJwtToken() {
    // create token that expires in 15 minutes
    const tokenPayload = {
      exp: Math.round(new Date(Date.now() + 2 * 60 * 1000).getTime() / 1000),
    };
    return `fake-jwt-token.${Buffer.from(JSON.stringify(tokenPayload)).toString(
      "base64"
    )}`;
  }
  function generateRefreshToken() {
    const tokenPayload = {
      exp: Math.round(new Date(Date.now() + 3 * 60 * 1000).getTime() / 1000),
    };
    return `fake-refresh-token.${Buffer.from(
      JSON.stringify(tokenPayload)
    ).toString("base64")}`;
  }
};
