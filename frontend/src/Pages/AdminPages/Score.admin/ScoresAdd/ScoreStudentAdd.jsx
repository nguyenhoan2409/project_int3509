import React, {useState } from 'react'
import axios from 'axios';
import Layout from '~/Pages/Layout/Layout';
import './ScoreStudentAdd.css'
import * as XLSX from 'xlsx';
import { ScoresManagement } from '../ScoreLayout/ScoreLayout';
import { Alert } from 'react-bootstrap';

export const ScoreStudentAdd = () => {
  const [excelFile, setExcelFile] = useState(null);
  const [excelData, setExcelData] = useState(null);
  const [subject, setSubject] = useState();
  const handleFile = (e) => {
    let selectedFile = e.target.files[0];
    if(selectedFile){
       let reader = new FileReader();
       reader.readAsArrayBuffer(selectedFile);
       reader.onload = (e) => {
         setExcelFile(e.target.result)
       }
    } else {
        Alert("Vui lòng chọn file!")
    }
  }
 const handleStudentFileSubmit = (e) => {
   e.preventDefault();
   if(excelFile !== null){
     const workbook = XLSX.read(excelFile, { type: "buffer" });
     const sheetName = workbook.SheetNames[0];
     const worksheet = workbook.Sheets[sheetName];
     const data = XLSX.utils.sheet_to_json(worksheet);
     setExcelData(data);
     const dataHeader = Object.keys(data[0]);
     if(dataHeader.length === 4){
       for(let i = 0; i < data.length; i++){
         addStudent(data[i]);
       }
     }
     if(dataHeader.length === 5) {
        console.log(dataHeader[4])
        setSubject(dataHeader[4]);
        console.log(data.length)
        for(let j = 0; j < data.length; j++){
           addScore(data[j]);
         }
       }
     
   }   
  }
  const addStudent = async (data) => {
    try {
      const res = await axios.post("http://localhost:8080/student/add", {
        mssv: data.mssv,
        fullname: data.fullname,
        class: data.class,
        university: data.university,
      }, {
        withCredentials: true,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      if (error.response) {
        console.error("Server responded with:", error.response.data);
      }
    }
  }
  const addScore = async (data) => {
    try {
      const scoreName = subject;
      const score = data[scoreName];
      const res = await axios.patch("http://localhost:8080/score/add", {
        mssv : data.mssv,
        subject: subject,
        score: score,
      }, {
        withCredentials: true,
      })
      await axios.get("http://localhost:8080/score/CDR", {
          withCredentials: true
        })
    } catch (error) {
      console.error("Error fetching data:", error);
      if (error.response) {
        console.error("Server responded with:", error.response.data);
      }
    }
  }
  return (
    <Layout>
    <ScoresManagement/>
      <div className='score-student-add-container'>
        <form className='score-student-add-form' onSubmit={handleStudentFileSubmit}>
          <input
            type="file"
            accept=".xlsx"
            onChange={handleFile}
            className='score-student-add-input'
          />
          <button className='score-student-add-button' type = "submit"> Xác nhận </button>
          </form>

          <div className='data-view'>
            {excelData?(
              <div className='table-data-res'>
                <h2> Danh sách </h2>
                <table className="table-data-score-student">
                <thead>
                  <tr> 
                    {Object.keys(excelData[0]).map((key) => (
                      <th className='table-data-head' key={key} > {key} </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {excelData.map((row) => (
                    <tr>
                      {Object.keys(row).map((key) => (
                        <td className='table-data-row' key={key}> {row[key]} </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
                </table>
                 </div>

            ) : (
            <div className='no-data'>
              <p className = "no-data-msg" >Không có file nào được tải </p>
              <div style={{display: 'flex', flexDirection: 'row'}}>
                  <p style={{width: '100px'}}> Lưu ý </p> 
                  <p style={{color: 'red', marginLeft: '5px', marginRight: '5px'}}>*</p> 
                  <div> 
                      <p>: File tải lên phải chỉ bao gồm các trường dữ liệu : </p>
                      <p> 1. Đối với tải danh sách sinh viên : mssv, fullname, class, university. </p>
                      <p> 2. Sau khi tải lên danh sách sinh viên thành công, có thể tải điểm với các trường dữ liệu :
                         mssv, fullname, class, university, subject (football, badminton,...). </p>
                  </div>
               </div>
              </div>
          )
            }
          </div>
      </div>
      </Layout>
  )
}