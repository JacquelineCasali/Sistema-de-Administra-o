 function excelDateToJSDate(serial) {
  const excelEpoch = new Date(1899, 11, 30);
  const jsDate = new Date(excelEpoch.getTime() + (serial * 86400000));
  
  const day = String(jsDate.getDate()).padStart(2, '0');
  const month = String(jsDate.getMonth() + 1).padStart(2, '0');
  const year = jsDate.getFullYear();

  return `${day}/${month}/${year}`;
}
module.exports={excelDateToJSDate}