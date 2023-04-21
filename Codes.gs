function getDeviceStatus(deviceId, headers) {
  var statusUrl = "https://api.switch-bot.com/v1.0/devices/" + deviceId + "/status";
  var options = {
    'method': 'get',
    'headers': headers
  };
  
  var response = UrlFetchApp.fetch(statusUrl, options);
  if (response.getResponseCode() == 200) {
    return JSON.parse(response.getContentText());
  } else {
    console.error("Error retrieving status for device " + deviceId + ": " + response.getResponseCode() + " " + response.getContentText());
    return null;
  }
}

function writeToSpreadsheet(deviceId, deviceName, temperature, humidity, battery) {
  var timestamp = new Date().toISOString();
  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(deviceName); // For separate sheets, use deviceName. For a single sheet, use "Data".
  if (!sheet) {
    sheet = ss.insertSheet(deviceName); // For separate sheets, use deviceName. For a single sheet, use "Data".
    sheet.appendRow(["Timestamp", "Device ID", "Device Name", "Temperature", "Humidity"]);
  }
  
  sheet.appendRow([timestamp, deviceId, deviceName, temperature, humidity]);
}


function main_append_data_separate_sheets() {
  var token = 'your token' ;
  var secret = 'your secret' ;

  var nonce = Utilities.getUuid();
  var t = new Date().getTime();
  var stringToSign = token + t + nonce;
  
  var sign = Utilities.base64Encode(Utilities.computeHmacSha256Signature(stringToSign, secret));
  
  var apiHeader = {
    'Authorization': token,
    'Content-Type': 'application/json',
    'charset': 'utf8',
    't': t.toString(),
    'sign': sign,
    'nonce': nonce
  };
  
  var url = "https://api.switch-bot.com/v1.0/devices";
  var options = {
    'method': 'get',
    'headers': apiHeader
  };
  
  var response = UrlFetchApp.fetch(url, options);
  var devices = JSON.parse(response.getContentText());
  console.log("Devices JSON:", JSON.stringify(devices, null, 2));
  
  if (devices) {
    var deviceList = devices.body.deviceList;

    for (var i = 0; i < deviceList.length; i++) {
      var device = deviceList[i];
      var deviceId = device.deviceId;
      var deviceName = device.deviceName;
      
      var statusData = getDeviceStatus(deviceId, apiHeader);
      
      if (statusData && statusData.body) {
        var temperature = statusData.body.temperature !== undefined ? statusData.body.temperature : null;
        var humidity = statusData.body.humidity !== undefined ? statusData.body.humidity : null;
        var battery = statusData.body.battery !== undefined ? statusData.body.battery : null;
        
        writeToSpreadsheet(deviceId, deviceName, temperature, humidity, battery);
      } else {
        writeToSpreadsheet(deviceId, deviceName, null, null, null);
      }
    }
  }
}
