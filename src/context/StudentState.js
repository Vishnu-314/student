import { useState } from "react";
import studentContext from "./studentContext";

const StudentState=()=>{
    const host="http://localhost:9000"
    const studentsIntial=[];
    const [students,setStudents]=useState(studentsIntial)

    const getStudents=async()=>{
        const response = await fetch(`${host}/allStudents`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }
          });
          const json=await response.json()
          console.log(json)
          setStudents(json)
    }

    const addStudents = async (name, rollnumber) => {
        //Api call
        const response = await fetch(`${host}/addStudent`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, rollnumber})
        });
        const json=await response.json();
        
        console.log(json)
    
        const student=json;
        setStudents(students.concat(student))
      }

      const deleteStudent =async (id) => {

        const response = await fetch(`${host}/deleteStudent/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        const json =await response.json();
        console.log(json)
        const newStudent = students.filter((student) => { return student._id !== id })
        setStudents(newStudent)
      }

    return (
        <studentContext.Provider value={{ students, addStudents, deleteStudent,getStudents }}>
          {props.children}
        </studentContext.Provider>
      )
}

export default StudentState;