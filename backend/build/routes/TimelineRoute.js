"use strict";

var _require = require("../controllers/TimelineController"),
  getTimelineList = _require.getTimelineList;
module.exports = function (router) {
  router.get('/api/timeline/getAll', getTimelineList);
};