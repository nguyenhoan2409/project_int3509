const { QueryTypes } = require("sequelize");
const { database } = require("../config/database");
const Certificate = require("../models/Certificate");
const moment = require('moment/moment');

exports.createCertificate = async function (req, res) {
  try {
    const data = req.body;
    const request = await Certificate.create({
      mssv: data.mssv,
      fullname: data.fullname,
      class: data.class,
      university: data.university,
      email: data.email,
      phonenumber: data.phonenumber,
      status: data.status,
      rental_time: moment().format('YYYY-MM-DD HH:mm:ss'),
      return_time: moment().add(1, "w").format('YYYY-MM-DD HH:mm:ss'),
      user_id: data.user_id
    });
    return res
      .status(200)
      .json({ msg: "Tạo yêu cầu thành công", request: request });
  } catch (error) {
    return res.status(400).json({ msg: error });
  }
};

exports.getAllCertificate = async function (req, res) {
  try {
    const certificateList = await database.query(
      `
        SELECT c.*, s.description
        FROM certificate c
        LEFT JOIN status s ON c.status = s.status_id
    `,
      { type: QueryTypes.SELECT }
    );
    const updatedCertificateList = certificateList.map((certificate) => ({
      ...certificate, 
      quantity: 1, 
      total_money: 0, 
      product_name: "Giấy chứng nhận chuẩn đầu ra", 
      product_type: 4, 
    }));
    return res.status(200).json(updatedCertificateList);
  } catch (error) {
    return res.status(400).json({ msg: error });
  }
};

exports.confirmCertificateStatus = async function(req, res) {
    try {
        const {certificateId, newStatus} = req.body; 
        const certificate = await Certificate.findOne({
            where: {
                certificate_id: certificateId
            }
        })
        if (!certificate) {
            return res.status(400).json({msg: "KhÔng tìm thấy yêu cầu cấp giấy chứng nhận."})
        }
        if (newStatus == 16) {
            certificate.update({
                status: newStatus, 
                return_time: moment().format('YYYY-MM-DD HH:mm:ss')
            })
        } else {
            certificate.update({
                status: newStatus
            })
        }
        
        return res.status(200).json({msg: "Cập nhật trạng thái yêu cầu cấp giấy chứng nhận thành công."}); 
    } catch (error) {
        return res.status(400).json({ msg: error });
    }
}

exports.getCertificateRequestById = async function(req, res) {
  try {
    const id = req.params.id; 
    const certificateList = await database.query(
      `
        SELECT c.*, s.description
        FROM certificate c
        LEFT JOIN status s ON c.status = s.status_id
        WHERE c.user_id = :id
    `,
      { replacements: {id: id}, type: QueryTypes.SELECT }
    );
    const updatedCertificateList = certificateList.map((certificate) => ({
      ...certificate, 
      quantity: 1, 
      total_money: 0, 
      product_name: "Giấy chứng nhận chuẩn đầu ra", 
      product_type: 4, 
    }));
    return res.status(200).json(updatedCertificateList); 
  } catch (error) {
    return res.status(400).json({ msg: error });
  }
}
