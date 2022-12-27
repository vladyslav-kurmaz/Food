function timer(finalDate, selector) {

  function calcTime(endTime) {
    let day, hour, minute, second;
    const t = Date.parse(endTime) - Date.parse(new Date());
    if (t < 0) {
      day = 0;
      hour = 0;
      minute = 0;
      second = 0;
    } else {
      day = Math.floor( t / (1000 * 60 * 60 * 24) );
      hour = Math.floor( (t / (1000 * 60 * 60)) % 24 );
      minute = Math.floor( (t / (1000 * 60)) % 60 );
      second = Math.floor( (t / 1000) % 60 ); 
    }
          
    return {
      total: t,
      day: day,
      hour: hour,
      minute: minute,
      second: second,
    };
  }

  function getZero(num) {
    if(num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function getTimeFromPage (selector, endTime) {
    const promotionTimer = document.querySelector(selector),
          days = promotionTimer.querySelector('#days'),
          hours = promotionTimer.querySelector('#hours'),
          minutes = promotionTimer.querySelector('#minutes'),
          seconds = promotionTimer.querySelector('#seconds'),
          intervelId = setInterval(setTimeToPage, 1000);

    setTimeToPage();    

    function setTimeToPage () {
      const resultCalcTime = calcTime(endTime);

      function renameTimerElem(data, d, h, m, s,) {
        const strDay = data.day + '',
              strHour = data.hour + '',
              strMin = data.minute + '',
              strSec = data.second + '',
              dayElem = d.nextSibling,
              hourElem = h.nextSibling,
              minElem = m.nextSibling,
              secElem = s.nextSibling;
        
        if (strDay != '11' && strDay[strDay.length -1] == '1') {
              dayElem.textContent = 'день';
            } else if (strDay == '12' || strDay == '13' || strDay == '14'){
              dayElem.textContent = 'дней';
            } else if (strDay[strDay.length -1] == '2' || strDay[strDay.length -1] == '3' ||
              strDay[strDay.length -1] == '4') {
                dayElem.textContent = 'дня';
            } else {
              dayElem.textContent = 'дней';
            }

        if (strHour != '11' && strHour[strHour.length -1] == '1' ) {
              hourElem.textContent = 'час';
            } else if (strHour == '12' || strHour == '13' || strHour == '14'){
              hourElem.textContent = 'часов';
            } else if (strHour[strHour.length -1] == '2' || strHour[strHour.length -1] == '3' ||
              strHour[strHour.length -1] == '4') {
                hourElem.textContent = 'часа';
    
            } else {
              hourElem.textContent = 'часов';
            }

        if (strMin != '11' && strMin[strMin.length -1] == '1') {
              minElem.textContent = 'минута';
            } else if (strMin == '12' || strMin == '13' || strMin == '14'){
              minElem.textContent = 'минут';
            } else if (strMin[strMin.length -1] == '2' || strMin[strMin.length -1] == '3' ||
              strMin[strMin.length -1] == '4') {
                minElem.textContent = 'минуты';
            } else {
              minElem.textContent = 'минут';
            }   
            
        if ( strSec != '11' && strSec[strSec.length -1] == '1') {
              secElem.textContent = 'секунда';
            } else if (strSec == '11' || strSec == '12' || strSec == '13' || strSec == '14') {
              secElem.textContent = 'секунд';
            } else if (strSec[strSec.length -1] == '2' || strSec[strSec.length -1] == '3' || 
              strSec[strSec.length -1] == '4') {
                secElem.textContent = 'секунды';
            } else {
              secElem.textContent = 'секунд';
            }
      }

      renameTimerElem(resultCalcTime, days, hours, minutes, seconds); 

      days.innerHTML = getZero(resultCalcTime.day);
      hours.innerHTML = getZero(resultCalcTime.hour);
      minutes.innerHTML = getZero(resultCalcTime.minute);
      seconds.innerHTML = getZero(resultCalcTime.second);
      
      if (resultCalcTime.total <= 0) {
        clearInterval(intervelId);
      }
    }
  }

  getTimeFromPage(selector, finalDate);
}

export default timer;