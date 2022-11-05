// Manipulating JS Date function to getDayName and timeofday

export const getDayName = () => {
    var days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    return days[new Date().getDay()];
  };
  
  export const getTimeOfDay = () => {
    var currentHour = new Date().getHours();
  
    if (currentHour < 12) {
      return 'Morning';
    } else if (currentHour < 18) {
      return 'Afternoon';
    } else {
      return 'Evening';
    }
  };
  
  // Function to calculate Distance
  export const calDistance = (lat1, lon1, lat2, lon2) => {
    const toRadian = angle => (Math.PI / 180) * angle;
    const distance = (a, b) => (Math.PI / 180) * (a - b);
  
    const RADIUS_OF_EARTH_IN_KM = 6371;
    const dLat = distance(lat2, lat1);
    const dLon = distance(lon2, lon1);
  
    lat1 = toRadian(lat1);
    lat2 = toRadian(lat2);
  
    // Haversine Formula
    const a =
      Math.pow(Math.sin(dLat / 2), 2) +
      Math.pow(Math.sin(dLon / 2), 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.asin(Math.sqrt(a));
  
    let finalDistance = RADIUS_OF_EARTH_IN_KM * c;
  
    return finalDistance.toFixed(3);
  };



  
  // Convert seconds to hours and minutes and seconds
  export const secondsToHm = seconds => {
    seconds = Number(seconds/1000);
  
    var hours = Math.floor(seconds / 3600);
    var minutes = Math.floor((seconds % 3600) / 60);
    var second = Math.floor((seconds % 3600) % 60);
  
    return (
      ('0' + hours).slice(-2) +
      ':' +
      ('0' + minutes).slice(-2) +
      ':' +
      ('0' + second).slice(-2)
    );
  };
  
  // function to calculate pace
  export const calculatePace = (dist, delta_time) => {

    console.log("input dist", dist)
    console.log("input delta_time", delta_time)

    const minutes = Number(delta_time/60000);

    console.log("input minute", minutes)


    if ((dist <= 0) || (delta_time <= 0)){
      console.log("pace 1")
      return 0;
    } else {
      const pace = minutes/dist

      console.log("pace 2", pace)
      if (pace > 20 ) {
        console.log("pace 3", pace)
        return 0
      } else {
        console.log("pace 4", pace)
        return pace
      }
       
    }



    /*if (dist <= 0.001) {
      return 0;
    }
    dist = parseFloat(dist);
    delta_time=delta_time/1000
    time = secondsToHm(delta_time);
    const hrs = parseInt(time.substring(0, 2));
    const mins = parseInt(time.substring(3, 5));
    const secs = parseInt(time.substring(6, 8));

    

  
    var timeElapsed = 0;
    timeElapsed += hrs * 60;
    timeElapsed += mins;
    timeElapsed += secs / 60;
    const pace = timeElapsed / dist;
    console.log("time", time)
    console.log("delta_time", delta_time)
    console.log("timeElapsed", timeElapsed)
    console.log("pace", pace)*/




  };
  
  // Function to show pace value to user
  export const pacePresentation = pace => {
    if (pace == 0) {
      console.log("check zero pace", pace)
      return '0:00';
      
    } else {
      const paceMins = Math.floor(pace);
      const paceSecs = Math.floor((pace % 1) * 60);
      pace = paceMins + ":" + paceSecs;

      console.log("check non zero", paceMins, paceSecs, pace)
      return pace;
    
    }
  
  };
  