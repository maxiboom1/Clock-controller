const timeStringToBytes = (time: string): Buffer => {
    const [hours, minutes, seconds] = time.split(':').map(Number);
  
    // Assuming that the values are within the valid range (0-59 for minutes and seconds, 0-23 for hours)
    const commandByte = 0xA5;
    const timerDisplayMode = 0x01; // HH:MM:SS format
    const startHour = hours;
    const startMinute = minutes;
    const startSecond = seconds;
    const startTenths = 0; // Assuming tenths of a second is always zero
    const endOfCountdownAlarmEnable = 0; // Disabled
    const alarmDurationSeconds = 0; // No alarm duration specified
    const startingDaysLSB = 0; // Assuming zero if omitted
    const startingDaysMSB = 0; // Assuming zero if omitted
  
    const byteArray = Buffer.from([
      commandByte,
      timerDisplayMode,
      startHour,
      startMinute,
      startSecond,
      startTenths,
      endOfCountdownAlarmEnable,
      alarmDurationSeconds,
      startingDaysLSB,
      startingDaysMSB,
    ]);
  
    return byteArray;
  };

export default timeStringToBytes;
