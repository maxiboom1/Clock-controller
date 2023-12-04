type ParsedResponse = {
  deviceType: number;
  clientIPAddress: string;
  macAddress: string;
  firmwareVersion: string;
  ntpSyncCount: number;
  displayedTime: string;
  tenthsOfSecond: number;
  displayMode: {
    modeCode: number;
    mode: string;
    displayMode: string;
    startStop: boolean;
  };
  downtimerAlarm: {
    alarmDuration: number;
    alarmChecked: boolean;
  };
  daysCurrentlyDisplayed: number;
  digitsValue: number;
  wifiSignalStrength: number;
  deviceName: string;
};

const parseResponse = (response: string): ParsedResponse => {
  const modeCode = parseInt(response.substr(38, 1), 16) & 0x07;
  const displayMode5 = !!(parseInt(response.substr(38, 1), 16) & 0x20);
  const displayMode7 = !!(parseInt(response.substr(38, 1), 16) & 0x80);

  return {
    deviceType: parseInt(response.substr(0, 2), 16),
    clientIPAddress: response.substr(2, 8).match(/.{2}/g)!.map((byte) => parseInt(byte, 16)).join('.'),
    macAddress: response.substr(10, 12),
    firmwareVersion: response.substr(22, 4),
    ntpSyncCount: parseInt(response.substr(26, 4), 16),
    displayedTime: response.substr(30, 6).match(/.{2}/g)!.join(':'),
    tenthsOfSecond: parseInt(response.substr(36, 2), 16),
    displayMode: {
      modeCode,
      mode: getModeString(modeCode),
      displayMode: getDisplayModeString(displayMode5, displayMode7),
      startStop: !!(parseInt(response.substr(38, 1), 16) & 0x40),
    },
    downtimerAlarm: {
      alarmDuration: parseInt(response.substr(40, 1), 16) & 0x7F,
      alarmChecked: !!(parseInt(response.substr(40, 1), 16) & 0x80),
    },
    daysCurrentlyDisplayed: parseInt(response.substr(42, 2), 16),
    digitsValue: parseInt(response.substr(44, 2), 16),
    wifiSignalStrength: parseInt(response.substr(46, 2), 16),
    deviceName: Buffer.from(response.substr(48, 32), 'hex').toString('utf-8').replace(/\0/g, ''),
  };
};

const getModeString = (modeCode: number): string => {
  switch (modeCode) {
    case 0:
      return "time";
    case 1:
      return "Up Timer";
    case 2:
      return "Down Timer";
    case 3:
      return "Interval Count Up";
    case 4:
      return "Interval Count Down";
    default:
      return "Unknown";
  }
};

const getDisplayModeString = (displayMode5: boolean, displayMode7: boolean): string => {
  if (!displayMode7 && displayMode5) {
    return "D:H:M mode";
  } else if (!displayMode7 && !displayMode5) {
    return "H:M:S mode";
  } else if (displayMode7 && !displayMode5) {
    return "M:S:Tenths mode";
  } else {
    return "Unknown";
  }
};

  
export default parseResponse;
  