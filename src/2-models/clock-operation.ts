const ClockOperation = {
  "SetUpTimer": [0xA2, 0x01, 0x00],
  "SetDownTimer": [0xA5, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
  "SetTimeMode": [0xA8, 0x01, 0x00],
  "GetClockStatus": [0xA1, 0x04, 0xB2]
}

export default ClockOperation;
