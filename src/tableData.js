function createData(name,date,number, from, message) {
    return {
        id: Math.random(),
        name,
        date,
        number,
        from,
        message,
        status: 'test'
    };
  }
  
  const rows = [
    createData('test', "23/20/21", "1234567890", "67544521212", "test message body", "Action, Delete"),

  ];

  export default rows;