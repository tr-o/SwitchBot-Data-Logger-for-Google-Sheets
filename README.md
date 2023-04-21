# SwitchBot-Data-Logger-for-Google-Sheets
**Version: 0.1.0**
This repository contains a script that fetches data from SwitchBot devices using the SwitchBot API and logs the data into separate sheets within a Google Spreadsheet. Each device's data is stored in a separate sheet named after the device.
![image](https://user-images.githubusercontent.com/98264095/233547447-6dcff79a-fb5a-4632-b18a-c842a3138794.png)


## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Included Files](#included-files)
- [Usage](#usage)
- [Important Functions](#important-functions)
- [Credits and Dependencies](#credits-and-dependencies)

## Features

- **SwitchBot API Integration**: Fetch data directly from your SwitchBot devices using the SwitchBot API, ensuring up-to-date and accurate information.
- **Temperature and Humidity Logging**: Record essential data points such as temperature and humidity from your SwitchBot devices for analysis and tracking purposes.
- **Battery Level Logging**: Monitor battery levels of your devices (currently unavailable) to ensure their uninterrupted operation.
- **Automatic Sheet Creation**: Automatically generate new sheets for each SwitchBot device, organizing your data in a clear and structured manner.
- **Historical Data Recording**: Append new data to existing sheets, maintaining a comprehensive historical record of your device's performance.
- **Google Sheets Compatibility**: Conveniently store and access your logged data in Google Sheets, leveraging the power of Google Workspace.
- **Customizable Data Logging**: Modify the script to fetch and log additional data points or to suit your specific requirements.


## Prerequisites

- A Google account with access to Google Sheets
- SwitchBot devices (with temperature and humidity sensors)
- SwitchBot API token and secret

## Included Files

- `Code.gs`: The Google Apps Script code file containing the main script for fetching data and logging it to Google Sheets
- `sample.xlsx`: A sample Google Sheets file demonstrating the expected output format and structure for logged data

## Usage

1. Create a new Google Sheet or use the provided `sample.xlsx` file as a starting point.
2. Open the Script Editor (Extensions > Apps Script) in the Google Sheet.
3. Copy and paste the code provided in the `Code.gs` file into the Script Editor.
4. Replace the placeholder `token` and `secret` variables in the `main_append_data_separate_sheets()` function with your actual SwitchBot API token and secret.
5. Save the script.
6. Run the `main_append_data_separate_sheets()` function to start logging data from your SwitchBot devices to the Google Sheet.

## Important Functions

- `main_append_data_separate_sheets()`: The main function that fetches device data and writes it to the Google Spreadsheet.
- `getDeviceStatus(deviceId, headers)`: Fetches the status data (temperature, humidity, and battery level) for a specific device.
- `writeToSpreadsheet(deviceId, deviceName, temperature, humidity, battery)`: Logs the device data into a Google Spreadsheet, creating a new sheet if necessary.

## Credits and Dependencies

This project relies on the [SwitchBot API](https://github.com/OpenWonderLabs/SwitchBotAPI) by [OpenWonderLabs](https://github.com/OpenWonderLabs). The SwitchBot API is used for fetching data from SwitchBot devices, which is then logged and processed in this project. Please refer to the [SwitchBot API repository](https://github.com/OpenWonderLabs/SwitchBotAPI) for more information and documentation on the API.


