/**
 * @param {string} fromTime - The current time in elf format
 * @param {string} takeOffTime - The take off time in elf format
 * @returns {number} The time in seconds until take off
 */
function timeUntilTakeOff(fromTime, takeOffTime) {
  const regex = /^(20[0-9]{2})\*(0[1-9]|1[0-2])\*(0[1-9]|[12]\d|3[01])@([01]\d|2[0-3])\|([0-5][0-9])\|([0-5][0-9])\sNP/
  const toUTC = elfDate => {
    const match = regex.exec(elfDate);
    if (match) {
      const [ year, month, day, hour, min, sec ] = match.slice(1).map(Number);
      return new Date(Date.UTC(year, month -1, day, hour, min, sec))
    }
  }
  return Math.floor((toUTC(takeOffTime) - toUTC(fromTime)) / 1000);
}