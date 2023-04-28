/*
 * dataAquisition.gs
 * 
 * This file contains the following functions:
 * 
 * - getSwitchbotData(): This function retrieves data from SwitchBot devices, such as deviceId, 
 *   deviceName, deviceType, enableCloudService, hubDeviceId, temperature, humidity, and battery.
 * 
 * - getDeviceStatus(deviceId, headers): This function gets the status of a specific device by its deviceId.
 * 
 * - getOpenWeatherMap(): This function fetches weather data from the OpenWeatherMap API for a specific city.
 * 
 * The file also includes a sample JSON object, "sampleJsonData," containing sample data for various devices.
 */

function getSwitchbotData() {
  var token = '';
  var secret = '';
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
  
  var url = "
https://api.switch-bot.com/v1.0/devices
";
  var options = {
    'method': 'get',
    'headers': apiHeader
  };

  var response = UrlFetchApp.fetch(url, options);
  var devices = JSON.parse(response.getContentText());
  var deviceList = devices.body.deviceList;

  var deviceDataList = deviceList.map(function (device) {
    var deviceId = device.deviceId;
    var deviceName = device.deviceName;
    var deviceType = device.deviceType;
    var enableCloudService = device.enableCloudService;
    var hubDeviceId = device.hubDeviceId;
    var statusData = getDeviceStatus(deviceId, apiHeader);
    var data = {};

    if (statusData && statusData.body) {
      data = {
        deviceId: deviceId,
        deviceName: deviceName,
        deviceType: deviceType,
        enableCloudService: enableCloudService,
        hubDeviceId: hubDeviceId,
        temperature: statusData.body.temperature !== undefined ? statusData.body.temperature : null,
        humidity: statusData.body.humidity !== undefined ? statusData.body.humidity : null,
        battery: statusData.body.battery !== undefined ? statusData.body.battery : null
      };
    } else {
      data = {
        deviceId: deviceId,
        deviceName: deviceName,
        deviceType: deviceType,
        enableCloudService: enableCloudService,
        hubDeviceId: hubDeviceId
      };
    }

    return data;
  });

  return deviceDataList;
}

function getDeviceStatus(deviceId, headers) {
  var statusUrl = "
https://api.switch-bot.com/v1.0/devices/
" + deviceId + "/status";
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

function getOpenWeatherMap() {
  var API_KEY = "";  // Replace with your API key
  var CITY_NAME = "tokyo";
  var BASE_URL = "
https://api.openweathermap.org/data/2.5/weather
";
  var queryParams = {
    "q": CITY_NAME,
    "appid": API_KEY,
    "units": "metric"  // Use "imperial" for Fahrenheit
  };
  var queryString = Object.keys(queryParams).map(function(key) {
    return encodeURIComponent(key) + '=' + encodeURIComponent(queryParams[key]);
  }).join('&');
  var url = BASE_URL + "?" + queryString;
  
  var response = UrlFetchApp.fetch(url);
  if (response.getResponseCode() == 200) {
    var weatherData = JSON.parse(response.getContentText());
    
    // Modify the JSON object to the desired format
    var result = {
      'deviceName': "openWeather",
      'base': weatherData.base,
      'clouds': weatherData.clouds,
      'cod': weatherData.cod,
      'coord': weatherData.coord,
      'dt': weatherData.dt, // Unix timestamp
      'id': weatherData.id,
      'feels_like': weatherData.main.feels_like, // Temperature in °C
      'humidity': weatherData.main.humidity, // Relative humidity in %
      'pressure': weatherData.main.pressure, // Atmospheric pressure in hPa
      'temperature': weatherData.main.temp, // Temperature in °C
      'temp_max': weatherData.main.temp_max, // Maximum temperature in °C
      'temp_min': weatherData.main.temp_min, // Minimum temperature in °C
      'name': weatherData.name,
      'sys': weatherData.sys,
      'timezone': weatherData.timezone, // Timezone offset in seconds
      'visibility': weatherData.visibility, // Visibility in meters
      'weather': weatherData.weather,
      'wind': weatherData.wind // Wind speed in m/s and direction in degrees
    };

    Logger.log(JSON.stringify(result, null, 2));
    return result;
  } else {
    Logger.log("Failed to fetch weather data: " + response.getContentText());
  }
}

  var sampleJsonData = 
  [ { deviceId: 'FFFF',
      deviceName: '温湿度計 01',
      deviceType: 'Meter',
      enableCloudService: false,
      hubDeviceId: '',
      temperature: 21.8,
      humidity: 67,
      battery: null },
      
    { deviceId: 'YYYY',
      deviceName: '防水温湿度計 3A',
      deviceType: 'WoIOSensor',
      enableCloudService: true,
      hubDeviceId: 'FDF1D670319B',
      temperature: 21.8,
      humidity: 64,
      battery: null },
    { deviceId: 'ZZZZ',
      deviceName: '防水温湿度計 3dA',
      deviceType: 'WoIOSensor',
      enableCloudService: true,
      hubDeviceId: 'VVVV',
      temperature: 21.8,
      humidity: 64,
      battery: null },

    { deviceId: 'AAAA',
      deviceName: '温湿度計 02',
      deviceType: 'Meter',
      enableCloudService: false,
      hubDeviceId: '',
      temperature: 21.6,
      humidity: 66,
      battery: null },

    { deviceId: 'VVVV',
      deviceName: 'ハブミニ 9B',
      deviceType: 'Hub Mini',
      enableCloudService: false,
      hubDeviceId: '',
      temperature: null,
      humidity: null,
      battery: null } ]
