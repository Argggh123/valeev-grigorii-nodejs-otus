import fs from 'fs';
import path from 'path';

const geoJSON = {
  type: "Feature",
  geometry: {
    type: "LineString",
    coordinates: [],
  },
};

export function removeFile() {
  try {
    fs.unlinkSync(path.resolve(__dirname, 'geoJSON.json'));
  } catch (e) {
    console.log(e);
  }
}

export function writeFile(payload) {

  geoJSON.geometry.coordinates.push([payload.lng, payload.lat]);
  fs.writeFileSync(path.resolve(__dirname, 'geoJSON.json'), JSON.stringify(geoJSON));

  return geoJSON;
}
