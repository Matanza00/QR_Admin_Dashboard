export const getLocation = (setLocation) => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return reject(new Error("Geolocation not supported"));
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const locationData = { lat: latitude, lng: longitude };
        setLocation(locationData);
        resolve(locationData);
      },
      (error) => {
        let errorMessage = "Unable to retrieve your location";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "User denied the request for Geolocation.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "The request to get user location timed out.";
            break;
          default:
            errorMessage = "An unknown error occurred.";
            break;
        }
        alert(errorMessage);
        reject(new Error(errorMessage));
      }
    );
  });
};
