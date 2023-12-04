const GetStatusArray: number[] = [0xA1, 0x04, 0xB2];

enum ClockOperation {
  SetUpTimer = 0xA2,
  SetDownTimer = 0xA5,
  SetTimeMode = 0xA8,
  GetStatus = GetStatusArray[0], 
}

export default ClockOperation;
