const fs = require("fs");
const path = require("path");

const routersDirectory = path.dirname(__dirname) + "/middleware/";
function getAllRouterFiles(dir, files_) {
  if (typeof files_ === "undefined") files_ = [];
  var files = fs.readdirSync(dir);
  for (var i in files) {
    var name = dir + files[i];
    if (fs.statSync(name).isDirectory()) {
      getAllRouterFiles(name, files_);
    } else if (files[i].slice(-14) === ".middleware.js") {
      files_.push(name);
    }
  }
  return files_;
}

module.exports = function (server, router) {
  let files = getAllRouterFiles(routersDirectory);
  files.forEach((file) => {
    require(file)(server, router);
  });
};
