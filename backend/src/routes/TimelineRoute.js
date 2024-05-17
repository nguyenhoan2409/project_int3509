const { getTimelineList } = require("../controllers/TimelineController")

module.exports = function (router) {
    router.get('/api/timeline/getAll', getTimelineList); 
}