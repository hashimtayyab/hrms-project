const Attendance = require('../../models/attendanceModel/Attendance');
const Employee = require('../../models/employeeModel/Employee')


const getEmployees = async () =>{
  try {
     const employees = await Employee.find();

    const attList = await Promise.all(
    employees.map(async (emp) => {
    const attCount = await Attendance.findOne(
    { employee: emp._id },
    { 
        count: { $size: '$attendance' },
    },            
    ).lean(); 
    var position = parseInt(attCount.count) - 1;
    var da = new Date();
    const attendance = await Attendance.updateOne(
      {employee: emp._id},
      { 
        $set: { 
            [`attendance.${position}.check_out_time`]: da 
        } 
    }, 
    { 
        arrayFilters: [{[`$attendance.${position}.check_out_time`]: null}]
    }
      ).lean();
      console.log(attendance);
      })
    )
    return attList;
} catch (error) {
    console.log(error);
}
}


// getEmployees();
module.exports = { getEmployees };