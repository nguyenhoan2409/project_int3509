var score = require('../models/score.model')
var xlsx = require('xlsx')
var fs = require('fs')
var { database } = require("../common/connect")
const { QueryTypes } = require('sequelize')
const { count } = require('console')


exports.importStudentList = async function (req, res) {
   try {
    let workbook = xlsx.readFile('C:\\Workspace\\project_int3509\\backend\\src\\controllers\\test\\k65cd.xlsx')
    let workSheet = workbook.Sheets[workbook.SheetNames[0]]
    let range = xlsx.utils.decode_range(workSheet["!ref"])
    let i = 0 
    //import excell
    for( let row = range.s.r + 1; row <= range.e.r; row ++) {
        let data = []
        //read cell
        for(let col = range.s.c; col <= range.e.c; col++) {
            let cell = workSheet[xlsx.utils.encode_cell({r: row, c: col})]
            data.push(cell.v)
        }
        let mssv = data[0]
        let fullname = data[1]
        let classs = data[2]
        let univercity = data[3]
          await database.query("INSERT INTO physicalscore (mssv, fullname, class, univercity) VALUES(:mssv, :fullname, :class, :univercity)", {
                replacements: {
                    mssv: mssv,
                    fullname: fullname,
                    class : classs,
                    univercity: univercity
                }
            })
            
    }
    return res.status(200).json({ msg: "Bạn đã thêm thành công" })
   } catch {
    return res.status(400).json({ msg: error })
   }
}

exports.score = async function (req, res) {
    try {
        let workbook = xlsx.readFile('C:\\Workspace\\project_int3509\\backend\\src\\controllers\\test\\football.xlsx')
        let workSheet = workbook.Sheets[workbook.SheetNames[0]]
        let range = xlsx.utils.decode_range(workSheet["!ref"])
        let i = 0
        //import excell
        let r = range.s.r
        let c = range.e.c
        let subject = workSheet[xlsx.utils.encode_cell({ r, c })]
    
        for (let row = range.s.r + 1; row <= range.e.r; row++) {
            let data = []
            //read cell
            for (let col = range.s.c; col <= range.e.c; col++) {
                let cell = workSheet[xlsx.utils.encode_cell({ r: row, c: col })]
                data.push(cell.v)
            }
            const mssv = data[0]
            const score = data[4]
            if (subject.v == "bóng đá") {
                 database.query("UPDATE physicalscore SET football_score=:score WHERE mssv = :mssv", {
                  replacements: {
                      mssv : mssv,
                      score: score
                  }, type: QueryTypes.UPDATE
                } )
              } else if (subject.v == "cầu lông") {
                    database.query("UPDATE physicalscore SET bedminton_score=:score WHERE mssv =:mssv", {
                      replacements: {
                          mssv : mssv,
                          score: score
                      }, type: QueryTypes.UPDATE
                  })
              } else if (subject.v == "bóng bàn") {
                    database.query("UPDATE physicalscore SET tabletennis_score=:score WHERE mssv =:mssv", {
                      replacements: {
                          mssv : mssv,
                          score: score
                      }, type: QueryTypes.UPDATE
                  })
              } else if (subject.v == "bóng rổ") {
                    database.query("UPDATE physicalscore SET basketball_score=:score WHERE mssv =:mssv", {
                      replacements: {
                          mssv : mssv,
                          score: score
                      }, type: QueryTypes.UPDATE
                  })
              } else if (subject.v == "bóng chuyền hơi") {
                   database.query("UPDATE physicalscore SET air_volleyball_score=:score WHERE mssv =:mssv", {
                      replacements: {
                          mssv : mssv,
                          score: score
                      }, type: QueryTypes.UPDATE
                  })
              } else if (subject.v == "bóng chuyền da") {
                    database.query("UPDATE physicalscore SET volleyball_score=:score WHERE mssv =:mssv", {
                      replacements: {
                          mssv : mssv,
                          score: score
                      }, type: QueryTypes.UPDATE
                  })
              } else if (subject.v == "taekwondo") {
                   database.query("UPDATE physicalscore SET taekwondo_score=:score WHERE mssv =:mssv", {
                      replacements: {
                          mssv : mssv,
                          score: score
                      }, type: QueryTypes.UPDATE
                  })
              } else if (subject.v == "golf") {
                    database.query("UPDATE physicalscore SET golf_score=:score WHERE mssv =:mssv", {
                      replacements: {
                          mssv : mssv,
                          score: score
                      }, type: QueryTypes.UPDATE
                  })
              }
        }
        return res.status(200).json({ msg: "Bạn đã thêm thành công" })
    } catch(error) {
        return res.status(400).json({ msg: error })
    }
}

exports.getAllScore = async function (req, res) {
    try {
       var data = await database.query("SELECT *FROM physicalscore", {type: QueryTypes.SELECT})
       console.log(data.length)
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
        return res.status(200).json(student)
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
        return res.status(200).json(student)
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
        if(count >= 4) {
            let CDR = 'Đạt'
            database.query("UPDATE physicalscore SET CDR=:CDR WHERE mssv =:mssv", {
                replacements: {
                    mssv: mssv,
                    CDR : CDR
                }, type: QueryTypes.UPDATE
            })
        }
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
        if (CDR == 'Đạt') {
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
    console.log(list)
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

}