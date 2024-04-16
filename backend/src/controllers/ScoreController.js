// var score = require('../models/score.model')
var xlsx = require('xlsx')
var fs = require('fs')
const { database } = require('../config/database')
const { QueryTypes } = require('sequelize')
// var db = require("../common/connect")

exports.addStudent = async function (req, res) {
    try {
        const student = await database.query("INSERT INTO physicalscore (mssv, fullname, class, univercity) VALUES(:mssv, :fullname, :class, :univercity)", {
            replacements: {
                mssv: req.body.mssv,
                fullname: req.body.fullname,
                class : req.body.class,
                univercity: req.body.univercity
            }
        })
        return res.status(200).json({ msg: "Thêm danh sách sinh viên thành công" })
    } catch(error) {
        return res.status(400).json({ msg: error })
    }
}

exports.addScore = async function (req, res) {
    try {
        let _subject= req.body.subject
        let subject = ""
        if(_subject === "football") {
            subject = "football_score"
        }
        if(_subject === "tabletennis") {
            subject = "tabletennis_score"
        }
        if(_subject === "basketball") {
            subject = "basketball_score"
        }
        if(_subject === "badminton") {
            subject = "bedminton_score"
        }
        if(_subject === "air_volleyball") {
            subject = "air_volleyball_score"
        }
        if(_subject === "volleyball") {
            subject = "volleyball_score"
        }
        if(_subject === "taekwondo") {
            subject = "taekwondo_score"
        }
        if(_subject === "golf") {
            subject = "golf_score"
        }
        const student = await database.query(`UPDATE physicalscore SET ${subject}=:score WHERE mssv =:mssv`, {
            replacements: {
                score: req.body.score,
                mssv: req.body.mssv
            }
        })
    return res.status(200).json({ msg: "Thêm điểm thành cong" })

    } catch(error) {
        return res.status(400).json({ msg: error })
    }
}
 
 exports.getAllScore = async function (req, res) {
     try {
        const data = await database.query("SELECT * FROM physicalscore", {type: QueryTypes.SELECT})
        console.log(data); 
        return res.status(200).json(data)
     }  catch(error) {
         return res.status(400).json({ msg: error })
     }
 }
 
 
 exports.searchScore = async function (req, res) {
     try {
         const mssv = req.params.id
         const student = await database.query("SELECT * FROM physicalscore WHERE mssv = :mssv", {
             replacements: {
                 mssv : mssv
             }, type : QueryTypes.SELECT
         })
         return res.status(200).json({ student })
     } catch(error) {
         return res.status(400).json({ msg: error })
     }
 }
 
 exports.updateScore = async function (req, res) {
     try {
         const student = database.query("UPDATE physicalscore SET football_score=:football_score, bedminton_score=:bedminton_score, tabletennis_score=:tabletennis_score, basketball_score=:basketball_score, air_volleyball_score=:air_volleyball_score, volleyball_score=:volleyball_score, taekwondo_score=:taekwondo_score, golf_score=:golf_score WHERE mssv =:mssv",
         { replacements : {
             football_score: req.body.football_score,
             bedminton_score: req.body.bedminton_score,
             tabletennis_score: req.body.tabletennis_score,
             basketball_score: req.body.basketball_score,
             air_volleyball_score: req.body.air_volleyball_score,
             volleyball_score: req.body.volleyball_score,
             taekwondo_score: req.body.taekwondo_score,
             golf_score: req.body.golf_score,
             mssv: req.body.mssv
         }, type: QueryTypes.UPDATE})
         return res.status(200).json({ student })
     } catch(error) {
         return res.status(400).json({ msg: error })
     }
 }
 
 exports.updateCDR = async function (req, res) {
     try {
         const list = await database.query("SELECT *FROM physicalscore", {type : QueryTypes.SELECT})
         for( let i = 0; i < list.length; i++) {
             let mssv = list[i].mssv
             console.log(mssv)
             let count = 0
         
         if(list[i].football_score >= 4) count++
         if(list[i].basketball_score >= 4) count++
         if(list[i].bedminton_score >= 4) count++
         if(list[i].tabletennis_score >= 4) count++
         if(list[i].air_volleyball_score >= 4) count++
         if(list[i].volleyball_score >= 4) count++
         if(list[i].taekwondo_score >= 4) count++
         if(list[i].golf_score >= 4) count++
         let CDR = ""
         if(count >= 4) {
              CDR = "Đ"    
         }  else { CDR = ""}
         database.query("UPDATE physicalscore SET CDR=:CDR WHERE mssv =:mssv", {
            replacements: {
                mssv: mssv,
                CDR : CDR
            }, type: QueryTypes.UPDATE
        })
     }
         return res.status(200).json({ msg: "Cập nhật CDR thành công" })
     } catch(error) {
         return res.status(400).json({ msg: error })
     }
 }
 
 exports.checkCDR = async function (req, res) {
     try {
         const check = await database.query("SELECT *FROM physicalscore WHERE mssv=:mssv", {
             replacements: {
                 mssv: req.params.id
             }, type: QueryTypes.SELECT
         })
         let CDR = check[0].CDR
         if (CDR == 1) {
             return res.status(200).json({ msg: "Bạn đã đạt chuẩn đầu ra" })
         } else {
             return res.status(200).json({ msg: "Bạn chưa đạt chuẩn đầu ra" })
         }
 
     } catch (error) {
         return res.status(400).json({ msg: error })
     }
 }
 
 exports.deleteSTudentList = async function(req, res) {
     const list = await database.query("SELECT *FROM physicalscore", {type: QueryTypes.SELECT})
     for(let i = 0; i < list.length; i++) {
         let mssv = list[i].mssv
             await database.query("DELETE FROM physicalscore WHERE mssv=:mssv", {
                 replacements: {
                     mssv: mssv
                 }, type: QueryTypes.DELETE },
                 (err, res) => {
                     if(err)  return res.status(400).json({ msg: error })
                     else  return res.status(200).json({ msg: "Đã xóa thành công" })
                 }
             )
     }
     return res.status(200).json({ msg: "Xóa thành công" })
 
 }

 exports.getCertificate = async function(req, res) {
     try {
         const data = req.body
         const student = await database.query("INSERT INTO certificate (mssv, fullname, class, university, email, phonenumber, status) VALUES(:mssv, :fullname, :class, :univercity, :email, :phonenumber, :status)", {
             replacements: {
                 mssv : data.mssv,
                 fullname: data.fullname,
                 class : data.class,
                 univercity: data.univercity,
                 email: data.email,
                 phonenumber: data.phonenumber,
                 status : "đã gửi yêu cầu"
             }, type : QueryTypes.SELECT
         })
         return res.status(200).json({ student })
     } catch(error) {
         return res.status(400).json({ msg: error })
     }
 }