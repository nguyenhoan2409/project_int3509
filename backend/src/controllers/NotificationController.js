const { QueryTypes } = require("sequelize");
const { database } = require("../config/database");

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
    const notification_id = req.body.notification_id;
    await database.query(
      "UPDATE notifications SET tittle=:tittle, content=:content, url=:url WHERE notification_id =:notification_id ",
      {
        replacements: {
          tittle: req.body.tittle,
          email: req.body.email,
          url: req.body.url,
          notification_id: notification_id,
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
    
        await database.query("INSERT INTO notification (tittle,content,url) VALUES (:tittle,:content,:url)", {
            replacements: {
                tittle: tittle, 
                content: content, 
                url: url, 
            }, type: QueryTypes.INSERT
        })
        return res.status(200).json({msg: "Đã thêm thông báo thành công"});
    } catch (error) {
        return res.status(400).json({msg: error})
    }
}
