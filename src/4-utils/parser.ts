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
  displayedTimeSeconds: number; // New property
};

const parseResponse = (response: string): ParsedResponse => {
  const modeCode = Number(response.match(/.{2}/g)[19]);
  const displayedTimeHex = response.substr(30, 6);
  const displayedTimeSeconds = hexToSeconds(displayedTimeHex);
  const displayedTime = formatSecondsToTime(displayedTimeSeconds);

  return {
    deviceType: parseInt(response.substr(0, 2), 16),
    clientIPAddress: response.substr(2, 8).match(/.{2}/g)!.map((byte) => parseInt(byte, 16)).join('.'),
    macAddress: response.substr(10, 12),
    firmwareVersion: response.substr(22, 4),
    ntpSyncCount: parseInt(response.substr(26, 4), 16),
    displayedTime,
    tenthsOfSecond: parseInt(response.substr(38, 2), 16),
    displayMode: {
      modeCode,
      mode: getModeString(modeCode),
      startStop: !!(parseInt(response.substr(38, 2), 16) & 0x40),
    },
    downtimerAlarm: {
      alarmDuration: parseInt(response.substr(40, 2), 16) & 0x7F,
      alarmChecked: !!(parseInt(response.substr(40, 2), 16) & 0x80),
    },
    daysCurrentlyDisplayed: parseInt(response.substr(42, 4), 16),
    digitsValue: parseInt(response.substr(44, 2), 16),
    wifiSignalStrength: parseInt(response.substr(46, 2), 16),
    deviceName: Buffer.from(response.substr(48, 32), 'hex').toString('utf-8').replace(/\0/g, ''),
    displayedTimeSeconds,
  };
};

const getModeString = (modeCode: number): string => {
  switch (modeCode) {
    case 0:
      return "timeMode";
    case 1:
      return "upTimer";
    case 2:
      return "manualMode";
    case 3:
      return "intervalCountUp";
    case 4:
      return "intervalCountDown";
    default:
      return "unknown";
  }
};

const hexToSeconds = (hexTime: string): number => {
  const hours = parseInt(hexTime.substr(0, 2), 16);
  const minutes = parseInt(hexTime.substr(2, 2), 16);
  const seconds = parseInt(hexTime.substr(4, 2), 16);

  return hours * 3600 + minutes * 60 + seconds;
};

const formatSecondsToTime = (seconds: number): string => {
  const hh = Math.floor(seconds / 3600).toString().padStart(2, '0');
  const mm = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
  const ss = (seconds % 60).toString().padStart(2, '0');

  return `${hh}:${mm}:${ss}`;
};

export default parseResponse;
