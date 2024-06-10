import proj4 from "proj4";
import { register } from "ol/proj/proj4.js";

export const EPSG_5186 = "EPSG:5186";
export const EPSG_5181 = "EPSG:5181";
export const EPSG_3857 = "EPSG:3857";

export function projectionsRegister() {
	proj4.defs(
		EPSG_3857,
		"+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs"
	);

	proj4.defs(
		EPSG_5186,
		"+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs"
	);

	// 중부원점(GRS80) [200,000 500,000]
	proj4.defs(
		EPSG_5181,
		"+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +units=m +no_defs"
	);

	proj4.defs("EPSG:4326", "+proj=longlat +datum=WGS84 +no_defs +type=crs");

	register(proj4);
}

export function koreaEpsg5186ToWgs84(x, y) {
	if (typeof x === "number" && typeof y === "number")
		return proj4(EPSG_5186, "WGS84", [x, y]);

	return null;
}

export function koreaEpsg5186ToEpsg3857(x, y) {
	if (typeof x === "number" && typeof y === "number")
		return proj4(EPSG_5186, EPSG_3857, [x, y]);

	return null;
}
