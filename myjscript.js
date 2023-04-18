const timeE1=document.getElementById('time');
const dateE1=document.getElementById('date');
const currentweathere1=document.getElementById('current-weather-items');
const timeZone=document.getElementById('time-zone');
const countrye1=document.getElementById('country');
const weatherforcaste1=document.getElementById('weather-forecast');
const tempe1=document.getElementById('current-temp');
const days=['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
const months=['january','feburary','march','april','may','june','july','august',
'august','sept','oct','nov','dec'];
const apikey='49cc8c821cd2aff9af04c9f98c36eb74';
setInterval(() => {
     const time=new Date();
     const month=time.getMonth();
     const  date=time.getDate(); 
     const day= time.getDay();
     const hour=time.getHours();
     const in12hrinterval=hour >=13? hour%12:hour;
     const minutes=time.getMinutes();
     const ampm= hour >=12 ?'PM':'AM';
      timeE1.innerHTML=(in12hrinterval<10?'0'+in12hrinterval:in12hrinterval)+ ':'+(minutes <10? '0'+minutes:minutes)+ ' ' + `<span 
      id="am-pm">${ampm}</span>`
     dateE1.innerHTML=days[day]+', '+date+' '+ months[month];
}, 1000);
 getweatherdata();
function getweatherdata(){
       navigator.geolocation.getCurrentPosition((success)=>{

let {latitude,longitude}=success.coords;
fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${apikey}`).then(res => res.json()).then(data => {

        console.log(data);
        showWeatherData(data);
})

       })
}  
function showWeatherData(data){
     let {humidity,pressure,sunrise,sunset,wind_speed}=data.current; 
     timeZone.innerHTML=data.timezone;
     countrye1.innerHTML=data.lat +'N '+'' +data.lon+'E'
      currentweathere1.innerHTML=` <div class="weather-items">
      <div>Humidity</div>
      <div>${humidity}</div>
</div>
<div class="weather-items">
      <div>pressure</div>
      <div>${pressure}</div>
</div>
<div class="weather-items">
      <div>windspeed</div>
      <div>${wind_speed}</div>
</div>
<div class="weather-items">
      <div>sunrise</div>
      <div>${window.moment(sunrise * 1000).format('HH:mm a')}</div>
</div>
<div class="weather-items">
      <div>sunset</div>
     <div>${window.moment(sunset * 1000).format('HH:mm a')}</div>`;
   
   
     let otherdayforcaste="";
    data.daily.forEach((day,idx) => {
       if(idx==0){
       tempe1.innerHTML=`<img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="w-icon" class="w-icon">
       <div class="others"> <div class="day">${window.moment(day.dt * 1000).format('ddd')}</div>
       <div class="temp">Night -${day.temp.night} &#8451;</div>
       <div class="temp">day -${day.temp.day}&#8451;</div></div>
</div>`
       }
       else{
              otherdayforcaste+=`<div class="weather-forecast-item">
              <div class="day">${window.moment(day.dt * 1000).format('ddd')}</div>
              <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
              <div class="temp">Night -${day.temp.night}&#8451; </div>
              <div class="temp">day -${day.temp.day}&#8451; </div>
       </div>`
       }
    });
    weatherforcaste1.innerHTML=otherdayforcaste;
}  
