const { getTimelineList } = require("../controllers/TimelineController")

module.exports = function (router) {
    router.get('/timeline/getAll', getTimelineList); 
}