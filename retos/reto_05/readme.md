## Reto #5: ⏱️ La cuenta atrás para el despegue
Los elfos tienen un **timestamp secreto**: es la fecha y hora exacta en la que **Papá Noel despega con el trineo** 🛷 para repartir regalos por el mundo. Pero en el Polo Norte usan un formato rarísimo para guardar la hora: ``YYYY*MM*DD@HH|mm|ss NP`` (ejemplo: ``2025*12*25@00|00|00 NP``).

Tu misión es escribir una función que reciba:

``fromTime`` → fecha de referencia en formato elfo (``YYYY*MM*DD@HH|mm|ss NP``).
``takeOffTime`` → la misma fecha de despegue, también en formato elfo.
La función debe devolver:

Los **segundos completos** que faltan para el despegue.
Si ya estamos en el despegue exacto → ``0``.
Si el despegue ya ocurrió → un **número negativo** indicando cuántos segundos han pasado desde entonces.

#### 🎯 Reglas

Convierte el formato elfo a un timestamp primero. El sufijo ``NP`` indica la hora oficial del Polo Norte (sin husos horarios ni DST), así que puedes tratarlo como si fuera UTC.
Usa diferencias en **segundos**, no en milisegundos.
Redondea siempre hacia abajo (``floor``): solo segundos completos.

#### 🧩 Ejemplos

```js
const takeoff = '2025*12*25@00|00|00 NP'

// desde el 24 diciembre 2025, 23:59:30, 30 segundos antes del despegue
timeUntilTakeOff('2025*12*24@23|59|30 NP', takeoff)
// 30

// justo en el momento exacto
timeUntilTakeOff('2025*12*25@00|00|00 NP', takeoff)
// 0

// 12 segundos después del despegue
timeUntilTakeOff('2025*12*25@00|00|12 NP', takeoff)
// -12
```

#### 💡 Soluciones
```js
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
```
```js
/**
 * @param {string} fromTime - The current time in elf format
 * @param {string} takeOffTime - The take off time in elf format
 * @returns {number} The time in seconds until take off
 */
function timeUntilTakeOff(fromTime, takeOffTime){
  const YYYY = "(20[0-9]{2})";
  const MM = "(0[1-9]|1[0-2])";
  const DD = "(0[1-9]|[12]\\d|3[01])";
  const HH = "([01]\\d|2[0-3])";
  const mm_ss = "([0-5][0-9])\\|([0-5][0-9])";
  const regex = new RegExp(
    `^${YYYY}\\*${MM}\\*${DD}@${HH}\\|${mm_ss}\\sNP`
  );  

  const toUTC = elfDate => {
    const match = regex.exec(elfDate);
    if (match) {
      const [ year, month, day, hour, min, sec ] = match.slice(1).map(Number);
      return new Date(Date.UTC(year, month -1, day, hour, min, sec))
    }
  }
  return Math.floor((toUTC(takeOffTime) - toUTC(fromTime)) / 1000);
}
```