export const getUserCoords = async () => {
  if (navigator.geolocation) {
    return new Promise<string>((resolve) => {
      navigator.geolocation.getCurrentPosition(
        async ({ coords: { latitude, longitude } }) => {
          resolve(`${latitude} ${longitude}`);
        },
        () => resolve("not-allowed") // If user denies location access
      );
    });
  } else {
    return "not-allowed";
  }
};
