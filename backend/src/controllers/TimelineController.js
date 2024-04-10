const Timeline = require("../models/Timeline");

exports.getTimelineList = async function (req, res) {
  try {
    const timelines = await Timeline.findAll();

    const timeline_response = timelines.map((timeline) => ({
      id: timeline.timeline_id,
      value: timeline.start_time.slice(0, 5) + " - " + timeline.end_time.slice(0, 5),
    }));
    return res.status(200).json(timeline_response);
  } catch (error) {
    return res.status(400).json({ msg: error });
  }
};
