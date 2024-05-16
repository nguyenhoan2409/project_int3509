const { QueryTypes } = require("sequelize");
const { database } = require("../config/database");
const moment = require('moment/moment');

exports.getNotificationList = async function (req, res) {
  try {
    const notification = await database.query("SELECT * FROM notification", {
      type: QueryTypes.SELECT,
    });
    return res.status(200).json(notification);
  } catch (error) {
    return res.status(400).json({ msg: error });
  }
};

exports.getNotificationDetail = async function (req, res) {
  try {
    const notification_id = req.params.id;

    const notificationDetail = await database.query(
      "SELECT * FROM notification WHERE notification_id = :notification_id",
      {
        replacements: {
          notification_id: notification_id,
        },
        type: QueryTypes.SELECT,
      }
    );

    return res.status(200).json(notificationDetail[0]);
  } catch (error) {
    return res.status(400).json({ msg: error });
  }
};

exports.updateNotification = async function (req, res) {
  try {
    await database.query(
      "UPDATE notification SET tittle=:tittle, content=:content WHERE notification_id =:notification_id ",
      {
        replacements: {
          tittle: req.body.tittle,
          content: req.body.content,
          notification_id: req.body.notification_id,
        },
        type: QueryTypes.UPDATE,
      }
    );
    return res.status(200).json({ msg: "Đã cập nhật thông báo thành công" });
  } catch (error) {
    return res.status(400).json({ msg: error });
  }
};
exports.createNotification = async function(req,res) {
    try {
        const tittle = req.body.tittle
        const content = req.body.content
        const url = req.body.url
        const create_time = req.body.create_time
    
        await database.query("INSERT INTO notification (tittle, content,url, create_time) VALUES (:tittle,:content,:url, :create_time)", {
            replacements: {
                tittle: tittle, 
                content: content, 
                url: url, 
                create_time : create_time + " " + moment().locale('vi').format('HH:mm:ss')
            }, type: QueryTypes.INSERT
        })
        return res.status(200).json({msg: "Đã thêm thông báo thành công"});
    } catch (error) {
        return res.status(400).json({msg: error})
    }
}
