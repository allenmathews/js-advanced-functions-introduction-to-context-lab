// function createEmployeeRecord(array) {
//     return {
//         firstName: array[0],
//         familyName: array[1],
//         title: array[2],
//         payPerHour: array[3],

//         timeInEvents: [],
//         timeOutEvents: [],
//     };
// }

// function createEmployeeRecords(array) {
//     return array.map((record) => createEmployeeRecord(record));
// }

// function createTimeInEvent(record, time) {
//     record.timeInEvents.push({
//         type: "TimeIn",
//         date: time.split(" ")[0],
//         hour: parseInt(time.split(" ")[1]),
//     });
//     return record;
// }

// function createTimeOutEvent(record, time) {
//     try {
//         if (record.timeInEvents.find((e) => e.date === time.split(" ")[0])) {
//             record.timeOutEvents.push({
//                 type: "TimeOut",
//                 date: time.split(" ")[0],
//                 hour: parseInt(time.split(" ")[1]),
//             });
//             return record;
//         } else throw "No time in for this date";
//     } catch (err) {
//         console.error(err);
//     }
// }

// function hoursWorkedOnDate(record, date) {
//     const timeInObj = record.timeInEvents.find((e) => e.date === date);
//     const timeOutObj = record.timeOutEvents.find((e) => e.date === date);
//     return (timeOutObj.hour - timeInObj.hour) / 100;
// }

// function wagesEarnedOnDate(record, date) {
//     return hoursWorkedOnDate(record, date) * parseInt(record.payPerHour);
// }

// function allWagesFor(record) {
//     return record.timeInEvents
//         .map((e) => wagesEarnedOnDate(record, e.date))
//         .reduce((total, curr) => total + curr);
// }

// function calculatePayroll(records) {
//     return records
//         .map((r) => allWagesFor(r))
//         .reduce((total, curr) => total + curr);
// }

// function findEmployeeByFirstName(records, firstName) {
//     return records.find((r) => r.firstName === firstName);
// }

// const record = createEmployeeRecord([
//     "Afraa",
//     "Alobaid",
//     "Software Engineer",
//     40,
// ]);
// createTimeInEvent(record, "12 5654");
// console.log(createTimeOutEvent(record, "12 544"));
function createEmployeeRecord(array) {
    const keys = ['firstName', 'familyName', 'title', 'payPerHour']
    const employeeData = {}
    for (let i = 0; i <= array.length - 1; i++) {
        employeeData[keys[i]] = array[i]
    }
    employeeData['timeInEvents'] = []
    employeeData['timeOutEvents'] = []
    return employeeData
}

function createEmployeeRecords(arrays) {
    let arrayOfArrays = []
    for (let i = 0; i <= arrays.length - 1; i++) {
        arrayOfArrays = [...arrayOfArrays, createEmployeeRecord(arrays[i])]
    }
    return arrayOfArrays
}

function createTimeInEvent(employeeRecord, timeIn) {
    const timeInObj = {}
    timeInObj['type'] = 'TimeIn'
    let date = ''
    let hour = ''
    for (let i = 0; i <= timeIn.length - 1; i++) {
        if (i <= 9) {
            date = date + timeIn.charAt(i)
        } else if (i >= 11) {
            hour = hour + timeIn.charAt(i)
        }
    }
    timeInObj['date'] = date
    timeInObj['hour'] = parseInt(hour)
    let employeeRecordCopy = employeeRecord
    employeeRecordCopy.timeInEvents.push(timeInObj)
    return employeeRecordCopy
}

function createTimeOutEvent(employeeRecord, timeOut) {
    const timeOutObj = {}
    timeOutObj['type'] = 'TimeOut'
    let date = ''
    let hour = ''
    for (let i = 0; i <= timeOut.length - 1; i++) {
        if (i <= 9) {
            date = date + timeOut.charAt(i)
        } else if (i >= 11) {
            hour = hour + timeOut.charAt(i)
        }
    }
    timeOutObj['date'] = date
    timeOutObj['hour'] = parseInt(hour)
    let employeeRecordCopy = employeeRecord
    employeeRecordCopy.timeOutEvents.push(timeOutObj)
    return employeeRecordCopy
}

function hoursWorkedOnDate(employeeRecord, date) {
    if (employeeRecord.timeInEvents[0].date === date && employeeRecord.timeOutEvents[0].date === date) {
        return (employeeRecord.timeOutEvents[0].hour - employeeRecord.timeInEvents[0].hour) / 100
    }
}

function wagesEarnedOnDate(employeeRecord, date) {
    return hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour
}

function allWagesFor(employeeRecord) {
    let totalHours = 0
    for (let i = 0; i <= employeeRecord.timeInEvents.length - 1; i++) {
        totalHours = totalHours + (employeeRecord.timeOutEvents[i].hour - employeeRecord.timeInEvents[i].hour)
    }
    return (totalHours * employeeRecord.payPerHour) / 100
}

function calculatePayroll(arrayOfemployeeRecords) {
    let grandTotalOwed = arrayOfemployeeRecords.reduce((acc, curr) => acc + allWagesFor(curr), 0)
    return grandTotalOwed
}

function findEmployeeByFirstName(employees, nameToLookUp) {
    return employees.find(employee => employee.firstName === nameToLookUp)
}