# SwitchBot-Data-Logger-for-Google-Sheets

This script fetches data from SwitchBot devices using the SwitchBot API and logs the data into separate sheets within a Google Spreadsheet. Each device's data is stored in a separate sheet named after the device.

## Features

- Fetches data from SwitchBot devices using the SwitchBot API
- Logs temperature, humidity, and battery information
- Stores data in separate sheets within a Google Spreadsheet
- Creates new sheets for devices when necessary
- Appends data to existing sheets to maintain a historical record

## Prerequisites

- A Google account with access to Google Sheets
- SwitchBot devices (with temperature and humidity sensors)
- SwitchBot API token and secret

## Usage

1. Create a new Google Sheet.
2. Open the Script Editor (Extensions > Apps Script) in the Google Sheet.
3. Copy and paste the code provided in the script file into the Script Editor.
4. Replace the placeholder `token` and `secret` variables in the `main_append_data_separate_sheets()` function with your actual SwitchBot API token and secret.
5. Save the script.
6. Run the `main_append_data_separate_sheets()` function to start logging data from your SwitchBot devices to the Google Sheet.

## Important Functions

- `main_append_data_separate_sheets()`: The main function that fetches device data and writes it to the Google Spreadsheet.
- `getDeviceStatus(deviceId, headers)`: Fetches the status data (temperature, humidity, and battery level) for a specific device.
- `writeToSpreadsheet(deviceId, deviceName, temperature, humidity, battery)`: Logs the device data into a Google Spreadsheet, creating a new sheet if necessary.
