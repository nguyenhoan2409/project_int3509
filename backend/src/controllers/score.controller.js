var score = require('../models/score.model')
var xlsx = require('xlsx')
var fs = require('fs')
var {database} = require("../common/connect")

exports.importStudentList = function(req, res) {
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
        database.query("INSERT INTO physicalscore (mssv, fullname, class, univercity) VALUES(?, ?, ?, ?)", data, (err, result) =>{
            if(err) console.log(err)
            else {  i++
                    console.log(i) }
        })
    }
    database.end()
} 

exports.score = function(req, res) {
    let workbook = xlsx.readFile('C:\\Workspace\\project_int3509\\backend\\src\\controllers\\test\\football.xlsx')
    let workSheet = workbook.Sheets[workbook.SheetNames[0]]
    let range = xlsx.utils.decode_range(workSheet["!ref"])
    let i = 0 
    //import excell
    let r = range.s.r
    let c = range.e.c
    let subject = workSheet[xlsx.utils.encode_cell({r, c} )]
    console.log(subject.v)
    
    for( let row = range.s.r + 1; row <= range.e.r; row ++) {
        let data = []
        //read cell
        for(let col = range.s.c; col <= range.e.c; col++) {
            let cell = workSheet[xlsx.utils.encode_cell({r: row, c: col})]
            data.push(cell.v)
        }
        const mssv = data[0]
        const score = data[4]
        if(subject.v == "bóng đá") {
            database.query("UPDATE physicalscore SET football_score=? WHERE mssv =?", [score, mssv], (err, result) =>{
                if(err) console.log(err)
            })
        } else if(subject.v == "cầu lông") {
            database.query("UPDATE physicalscore SET bedminton_score=? WHERE mssv =?", [score, mssv], (err, result) =>{
                if(err) console.log(err)
            })
        } else if(subject.v == "bóng bàn") {
            database.query("UPDATE physicalscore SET tabletennis_score=? WHERE mssv =?", [score, mssv], (err, result) =>{
                if(err) console.log(err)
            })
        } else if(subject.v == "bóng rổ") {
            database.query("UPDATE physicalscore SET basketball_score=? WHERE mssv =?", [score, mssv], (err, result) =>{
                if(err) console.log(err)
            })
        } else if(subject.v == "bóng chuyền hơi") {
            database.query("UPDATE physicalscore SET air_volleyball_score=? WHERE mssv =?", [score, mssv], (err, result) =>{
                if(err) console.log(err)
            })
        } else if(subject.v == "bóng chuyền da") {
            database.query("UPDATE physicalscore SET volleyball_score=? WHERE mssv =?", [score, mssv], (err, result) =>{
                if(err) console.log(err)
            })
        } else if(subject.v == "taekwondo") {
            database.query("UPDATE physicalscore SET taekwondo_score=? WHERE mssv =?", [score, mssv], (err, result) =>{
                if(err) console.log(err)
            })
        } else if(subject.v == "golf") {
            database.query("UPDATE physicalscore SET golf_score=? WHERE mssv =?", [score, mssv], (err, result) =>{
                if(err) console.log(err)
            })
        }
    }
    database.end()
}

exports.getAllScore = function(req, res) {
    database.query("SELECT *FROM physicalscore", function(err, score){
        if(err) {
           return res.json("Không có sinh viên nào")
        } else
            return res.send(score)
    })
}


exports.searchScore = function (req, res) {
    const mssv = req.params.id
    database.query("SELECT * FROM physicalscore WHERE mssv = ?",mssv, function(err, score) {
        if(err || score.length == 0) {
           return res.json("Không tồn tại người dùng")
        } else {
           return res.send(score)
        }
       })
}

exports.updateScore = function (req, res) {
    database.query("UPDATE physicalscore SET football_score=?, bedminton_score=?, tabletennis_score=?, basketball_score=?, air_volleyball_score=?, volleyball_score=?, taekwondo_score=? golf_score=? WHERE mssv = ?", [req.body.football_score, req.body.bedminton_score, req.body.tabletennis_score, req.body.basketball_score, req.body.air_volleyball_score, req.body.volleyball_score, req.body.taekwondo_score, req.body.golf_score, req.body.mssv ], function(err, score) {
        if(err) {
            return res.json(err,null)
        } else {
            return res.send("Cập nhật điểm thành công")
        }
    }) 
}

exports.getCDR = function(req,res) {
    const list = database.query("SELECT *FROM physicalscore", function(req, score) {
        for( let i = 0; i < score.length; i++) {
            let mssv = score[i].mssv
            let CDR = score[i].CDR
            let count = 0
            if(score[i].football_score >= 4) {
                count++
            }
            if(score[i].bedminton_score >= 4) {
                count++
            }
            if(score[i].tabletennis_score >= 4) {
                count++
            }
            if(score[i].basketball_score >= 4) {
                count++
            }
            if(score[i].air_volleyball_score >= 4) {
                count++
            }
            if(score[i].volleyball_score >= 4) {
                count++
            }
            if(score[i].taekwondo_score >= 4) {
                count++
            }
            if(score[i].golf_score >= 4) {
                count++
            }
            if(count >= 4) {
                CDR = 1
                database.query("UPDATE physicalscore SET CDR=? WHERE mssv = ?", [CDR, mssv], function(err, score) {
                    if(err) {
                        return res.json(err,null)
                    } else {
                        return res.send("Cập nhật CĐR thành công")
                    }
                }) 
            }

        }
    })

}

exports.checkCDR = function(req, res) {
    const check = database.query("SELECT *FROM physicalscore WHERE mssv=?", req.params.id, function(req, score) {
        let CDR = score[0].CDR
        if(CDR == 1) {
            return res.send("Bạn đã đạt chuẩn đầu ra")
        } else {
            return res.send("Bạn chưa đạt chuẩn đầu ra")
        }
        
})
}