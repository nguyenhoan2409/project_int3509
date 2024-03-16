const db = require('../common/connect')
const physicalscore = function(physicalscore) {
    this.mssv = physicalscore.mssv
    this.fullname = physicalscore.fullname
    this.class = physicalscore.class
    this.univercity = physicalscore.univercity
    this.football_score = physicalscore.football_score
    this.bedminton_score = physicalscore.bedminton_score
    this.tabletennis_score = physicalscore.tabletennis_score
    this.basketball_score = physicalscore.basketball_score
    this.air_volleyball_score = physicalscore.air_volleyball_score
    this.volleyball_score = physicalscore.volleyball_score
    this.taekwondo_score = physicalscore.taekwondo_score
    this.golf_score = physicalscore.golf_score
    this.CDR = physicalscore.CDR
}


module.exports = physicalscore

