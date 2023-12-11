# Clock controller
 Remote control for time-machines clocks
 API specs: https://www.timemachinescorp.com/wp-content/uploads/TimeMachinesControlAPI.pdf

 My concept is to build modular app, each module will provide methods to device.

 For example, i have clock-module - that can interact with time-machines clock.

 Then, I added Tricaster module that can fetch timecode data from tricaster DDR's (Using tricaster's REST).

 Then, I added vMix module, that can fetch timecode data from vMix (using TCP/IP protocol).

 The app have web config, and i plan to add clock and clock-controllers config there (hosts, which src to watch etc...).

 Also, in the future, it will be nice to add licensing mechanism.

 

