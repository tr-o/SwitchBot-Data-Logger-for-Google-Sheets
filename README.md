# SwitchBot Data Logger for Google Sheets

Version: 0.1.2

The SwitchBot Data Logger for Google Sheets is designed to collect data from SwitchBot devices and the OpenWeatherMap API and log the data (temperature, humidity, and absolute humidity) to a Google Sheets document.
![image](https://user-images.githubusercontent.com/98264095/235267917-bf176bcd-e51a-4101-9e2e-a9fcebaa5962.png)


## Table of Contents

1. [Features](#features)
2. [Included Files](#included-files)
3. [Usage](#usage)
4. [Automation](#automation)
5. [Credit and Dependencies](#credit-and-dependencies)

## Features

- Retrieve data from SwitchBot devices
- Fetch weather data from the OpenWeatherMap API
- Calculate absolute humidity
- Log data to Google Sheets (humidity, temperature, and absolute humidity)
- Automatically update data at specified intervals

## Included Files

1. dataAquisition.gs
2. writeDataToSheet.gs

## Usage

1. Create a new Google Sheets document.
2. Click on "Extensions" in the menu and then select "Apps Script."
3. In the Apps Script editor, create two new script files with the names `dataAquisition.gs` and `writeDataToSheet.gs`.
4. Copy the content of the `dataAquisition.gs` file from this project into the corresponding file in the Apps Script editor.
5. Update the `API_KEY` in the `getOpenWeatherMap()` function with your own OpenWeatherMap API key.
6. Update the `token` and `secret` variables in the `getSwitchbotData()` function with your SwitchBot API key and secret.
7. Repeat step 4 for the `writeDataToSheet.gs` file.
8. Create three new sheets in your Google Sheets document with the names "humidity", "temperature", and "absoluteHumidity."
9. Run the `writeDataToAllSheets()` function in the Apps Script editor to log the data to your Google Sheets document.

## Automation

To automatically log the data at regular intervals, you can create a time-driven trigger in the Apps Script editor:

1. Click on the clock icon (Triggers) in the left sidebar of the Apps Script editor.
2. Click the "+ Add Trigger" button in the bottom right corner.
3. Choose the `writeDataToAllSheets()` function for the "Choose which function to run" option.
4. Select "Time-driven" as the event source.
5. Choose the desired time interval (e.g., every hour or every day).
6. Save the trigger.

The data logger will now automatically log the data at the specified interval.

## Credit and Dependencies

This project is inspired by the work of the OpenAI community and utilizes the following APIs:

- [SwitchBot API](https://github.com/OpenWonderLabs/SwitchBotAPI)
- [OpenWeatherMap API](https://openweathermap.org/api)

This project is released under the MIT License.
