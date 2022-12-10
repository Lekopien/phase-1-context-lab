/* Your Code Here */
let createEmployeeRecord = function(row){
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(employeeRowData) {
    return employeeRowData.map(function(row){
        return createEmployeeRecord(row)
    })
}

let createTimeInEvent = function(dateStamp){
    let [date, hour] = dateStamp.split(' ')

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })

    return this
}

let createTimeOutEvent = function(dateStamp){
    let [date, hour] = dateStamp.split(' ')

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })

    return this
}

let hoursWorkedOnDate = function(soughtDate){
    let inEvent = this.timeInEvents.find(function(e){
        return e.date === soughtDate
    })

    let outEvent = this.timeOutEvents.find(function(e){
        return e.date === soughtDate
    })

    return (outEvent.hour - inEvent.hour) / 100
}

let wagesEarnedOnDate = function(dateSought){
    let rawWage = hoursWorkedOnDate.call(this, dateSought)
        * this.payPerHour
    return parseFloat(rawWage.toString())
}

let findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find(function(rec){
      return rec.firstName === firstName
    })
  }
  
  let calculatePayroll = function(arrayOfEmployeeRecords){
      return arrayOfEmployeeRecords.reduce(function(memo, rec){
          return memo + allWagesFor.call(rec)
      }, 0)
  }
/*This is what each line does for further refrence on the rest!!!
 The code creates a function that takes an employee row data and returns a map of createEmployeeRecord objects.
 The code then calls the map() method on each object in the array to return all of the records for one employee.
 The code creates a function that takes in an employee row data and returns the appropriate createEmployeeRecord.
 The code creates two functions: createTimeInEvent and createTimeOutEvent.
 The first function takes in a dateStamp, which is the date of an event, and creates an object with the type "TimeIn" or "TimeOut".
 The second function takes in a dateStamp and creates an object with the type "TimeOut".
 The code will create a new object called "timeInEvents" and "timeOutEvents".
 The first function will take in the dateStamp as an argument and return the timeInEvent.
 The second function takes in the dateStamp as an argument and returns the timeOutEvent.
 The code is calculating the difference between the hours worked on a given date and the hours worked on another date.
 The code is also calculating how much money was made in that time period.
 The code will calculate the difference between the hours worked and the hours missed on a given date.
 let wagesEarnedOnDate = function(dateSought){ let rawWage = hoursWorkedOnDate.call(this, dateSought) * this.payPerHour return parseFloat(rawWage.toString())

*/
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

