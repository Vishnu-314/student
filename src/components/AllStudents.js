import React, { useEffect, useState } from 'react';

const StudentList = (props) => {
  const [students, setStudents] = useState([]);
  const [clickTime, setClickTime] = useState({});
  let l = students.length
  const [zlength, setzLength] = useState(l)

  useEffect(() => {
    fetch('http://localhost:9000/allStudents')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setStudents(data);
      })
      .catch(error => console.error(error));
  }, []);

  const handleDate = (date) => {
    const dateString = date;
    const dateObj = new Date(dateString);
    const timeString = dateObj.toLocaleTimeString();
    return timeString
  }

  const handleCheckout = (id) => {
    const newClickTime = { ...clickTime };
    newClickTime[id] = new Date().toLocaleTimeString();
    setClickTime(newClickTime);
    setzLength(zlength - 1);

    const newStudents = students.map(student => {
      if (student._id === id) {
        return { ...student, isCheckedOut: true };
      }
      return student;
    });

    setStudents(newStudents);
  };

  useEffect(() => {
    const updateCheckoutTime = (id) => {
      const checkoutCell = document.getElementById(`checkout-${id}`);
      if (checkoutCell) {
        checkoutCell.textContent = clickTime[id];
      }
    };

    Object.keys(clickTime).forEach(id => {
      updateCheckoutTime(id);
    });
  }, [clickTime]);

  return (
    <div className="isolate bg-white py-24 px-6 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">No Of Students Present Now : {students.filter(student => !student.isCheckedOut).length}</h2>

      </div>
      <div className="mx-auto mt-16 max-w-xl sm:mt-20">
        <table className="w-full table-fixed">
          <thead>
            <tr className="text-left">
              <th className="w-1/2 px-4 py-2">Name</th>
              <th className="w-1/2 px-4 py-2">Roll Number</th>
              <th className="w-1/2 px-4 py-2">Checked In</th>
              <th className="w-1/2 px-4 py-2">Checked Out</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.id}>
                <td className="border px-4 py-2">{student.name}</td>
                <td className="border px-4 py-2">{student.rollnumber}</td>
                <td className="border px-4 py-2">{handleDate(student.date)}</td>
                <td className="border px-4 py-2" id={`checkout-${student._id}`}>{clickTime[student.id]}</td>
                <td className="border px-4 py-2">
                  <button
                    className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white hover:bg-indigo-500'
                    onClick={() => handleCheckout(student._id)}
                    disabled={student.isCheckedOut}
                  >
                    {student.isCheckedOut ? 'Checked Out' : 'Check Out'}
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentList;
