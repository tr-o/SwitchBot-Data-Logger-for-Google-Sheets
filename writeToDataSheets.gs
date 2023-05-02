/*
 * writeDataToSheet.gs version 0.1.3
 * 
 * This file contains the following functions:
 * 
 * - writeDataToAllSheets(): This function writes the combined JSON data to all sheets for the specified
 *   measurements (humidity, temperature, and absoluteHumidity).
 * 
 * - combineJsonData(...datasets): This function combines the data from the SwitchBot devices and the opionally other sources like OpenWeatherMap API 
 *   into a single JSON object.
 * 
 * - calculateAbsoluteHumidity(data): This function calculates the absolute humidity for each data point and
 *   adds it to the input data.
 * 
 * - writeDataToOneSheet(data, measurement): This function writes the specified measurement data to a single
 *   sheet in Google Sheets.
 * 
 * The file is designed to work with Google Sheets and writes sensor data (temperature, humidity, and absolute
 * humidity) from SwitchBot devices and the OpenWeatherMap API to specified sheets. It calculates absolute
 * humidity using temperature and relative humidity data and updates the headers of the sheets with new device
 * names if necessary.
 */

function writeDataToAllSheets() {
  var data1 = getSwitchbotData();
  //var data2 = [getOpenWeatherMap()];//uncomment this line when use OpenWeatherMap
  var jsonData = combineJsonData(data1);//, data2, data3, data4, data5...);
  var list_of_measurements = ["humidity", "temperature", "absoluteHumidity"];
  for (var i = 0; i < list_of_measurements.length; i++) {
    var measurement = list_of_measurements[i];
    writeDataToOneSheet(jsonData, measurement);
  }
}

function combineJsonData(...datasets) {
  var integratedData = Array.prototype.concat.apply([], datasets);
  var integratedDataWithAbsoluteHumidity = calculateAbsoluteHumidity(integratedData);
  console.log(integratedDataWithAbsoluteHumidity);
  return integratedDataWithAbsoluteHumidity;
}


function calculateAbsoluteHumidity(data) {
  // Define physical constants
  var A = 6.112; // Water vapor pressure constant (hPa)
  var B = 17.67; // Temperature-related constant
  var C = 243.5; // Temperature-related constant (°C)
  var R = 216.7; // Gas constant for dry air (J/(kg·K))

  data.forEach(function(item) {
    var temperature = item.temperature; // Temperature (°C)
    var relativeHumidity = item.humidity; // Relative humidity (%)

    // If temperature or humidity is null, set absolute humidity to null and skip the calculation
    if (temperature === null || relativeHumidity === null) {
      item.absoluteHumidity = null;
      return;
    }

    // Calculate water vapor pressure (hPa)
    var waterVaporPressure = A * Math.exp((B * temperature) / (temperature + C));

    // Calculate saturation vapor density (g/m³)
    var saturationVaporDensity = R * (waterVaporPressure / (temperature + 273.15));

    // Calculate absolute humidity (g/m³)
    var absoluteHumidity = (relativeHumidity * saturationVaporDensity) / 100;

    // Add the absolute humidity to the item
    item.absoluteHumidity = parseFloat(absoluteHumidity.toFixed(2));
  });

  return data;
}



function writeDataToOneSheet(data, measurement) {
  // Filter the data by the property
  var filteredData = data.filter(function (item) {
    return item[measurement] !== null;
  });

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(measurement);
  if (!sheet) {
    return;
  }
  
  // Get the current headers
  var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  
  // Update headers with new device names
  filteredData.forEach(function(device) {
    if (device[measurement] !== null) {
      var deviceName = device.deviceName;
      if (!headers.includes(deviceName)) {
        headers.push(deviceName);
      }
    }
  });

  // Write the updated headers to the sheet
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // Create a new row with the current timestamp
  var newRow = Array(headers.length).fill('');
  //newRow[0] = new Date().toISOString();
  var date = new Date();
  newRow[0] = Utilities.formatDate(date, "JST", "yyyy-MM-dd'T'HH:mm:ss'Z'");  
  // Add measurement data for each device
  filteredData.forEach(function(device) {
    if (device[measurement] !== null) {
      var deviceName = device.deviceName;
      var headerIndex = headers.indexOf(deviceName);
      newRow[headerIndex] = device[measurement];
    }
  });
  
  // Write the new row to the sheet
  sheet.appendRow(newRow);
}





















