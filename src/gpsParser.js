import { transform } from "ol/proj";
import { smoothGPSPoints } from "./smoothGpsPoints.js";
import { kakaoProj } from "./tileMap";
import { DomElements } from "./domElements.js";

export function parseGps(data) {
	// format is `"dateString"   "rawGps"`

	const lines = data.split("\n");
	const gpsData = [];
	for (const line of lines) {
		const [date, time, rawGps] = line
			.trim()
			.replace(/\s+/g, " ")
			.replace(/"/g, "")
			.split(" ");

		const [
			_fixMode, // Fix mode: 2 = 2D fix  or  3 = 3D fix
			,
			,
			,
			,
			gps_lat, // Format: ddmm.mmmmmm (on Doc) or degrees in decimal (test in Korea)
			_northSouth, // N or S
			gps_lon, // Format: dddmm.mmmmmm (on Doc) or degrees in decimal (test in Korea)
			_eastWest, // E or W
			_dateUtc, // ddmmyy
			_timeUtc, // hhmmss.s
			altitude = 0, // Mean Sea Level (MSL) altitude, unit is meters
			speed, // speed over ground, unit is knots
			course, // course over ground, unit is degree
			pdop, // position dilution of precision
			hdop, // horizontal dilution of precision
			vdop, // vertical dilution of precision
		] = rawGps.split(",");

		gpsData.push({
			date: new Date(date + " " + time),
			rawGps: rawGps,
			lon: Number(gps_lon),
			lat: Number(gps_lat),
			altitude: Number(altitude),
			speed: Number(speed),
			course: Number(course),
			pdop: Number(pdop),
			hdop: Number(hdop),
			vdop: Number(vdop),
		});
	}

	return gpsData;
}

export function prepareData() {
	const data = parseGps(DomElements.gpsData.value);
	console.log(data);

	// Assuming you have an array of GPS coordinates in [latitude, longitude] format
	const gpsCoordinates = data.map((gps) => [gps.lon, gps.lat]);

	let smoothedData = smoothGPSPoints(data);
	const smoothCoordinates = smoothedData.map((gps) => [
		gps.smooth_lon,
		gps.smooth_lat,
	]);

	// Transform coordinates to [longitude, latitude] format expected by OpenLayers
	const coords = gpsCoordinates.map((coord) =>
		transform(coord, "EPSG:4326", kakaoProj)
	);

	const smoothCoords = smoothCoordinates.map((coord) =>
		transform(coord, "EPSG:4326", kakaoProj)
	);

	return {
		coords,
		smoothCoords,
	};
}
