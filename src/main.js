import * as ol from "ol";
import Map from "ol/Map.js";
import View from "ol/View.js";
import { projectionsRegister } from "./Pro4jUtils";
import {
	createLineLayer,
	createPointLayer,
	createPointSource,
	createLineSource,
} from "./createLayer.js";
import { defaultGps } from "./defaultGps";
import { DomElements } from "./domElements.js";
import { kakaoExtent, kakaoNormal, kakaoProj } from "./tileMap";
import { prepareData } from "./gpsParser.js";

projectionsRegister();
export const KOREA_DEFAULT_CENTER = [302750.22753, 416566.19802];

DomElements.gpsData.value = defaultGps;

const {
	coords: transformedCoordinates,
	smoothCoords: transformedSmoothCoordinates,
} = prepareData();

const gpsPointLayer = createPointLayer(transformedCoordinates, "red");
const gpsLineLayer = createLineLayer(transformedCoordinates, "red");

const smoothPointLayer = createPointLayer(transformedSmoothCoordinates, "blue");
const smoothLineLayer = createLineLayer(transformedSmoothCoordinates, "blue");

const layers = [
	kakaoNormal,
	gpsLineLayer,
	gpsPointLayer,
	smoothLineLayer,
	smoothPointLayer,
];
const map = new Map({
	layers: layers,
	target: "map",
	view: new View({
		center:
			transformedSmoothCoordinates[
				Math.floor(transformedSmoothCoordinates.length / 2)
			],
		zoom: 19,
		projection: kakaoProj,
		extent: kakaoExtent,
	}),
});

const handleReload = () => {
	const { coords, smoothCoords } = prepareData();

	const gpsPointSource = createPointSource(coords);
	const gpsLineSource = createLineSource(coords);

	const smoothPointSource = createPointSource(smoothCoords);
	const smoothLineSource = createLineSource(smoothCoords);

	gpsPointLayer.setSource(gpsPointSource);
	gpsLineLayer.setSource(gpsLineSource);
	smoothPointLayer.setSource(smoothPointSource);
	smoothLineLayer.setSource(smoothLineSource);

	const showGpsLayer = DomElements.gpsLayer.checked;
	const showSmoothLayer = DomElements.smoothLayer.checked;
	gpsPointLayer.setVisible(showGpsLayer);
	gpsLineLayer.setVisible(showGpsLayer);
	smoothPointLayer.setVisible(showSmoothLayer);
	smoothLineLayer.setVisible(showSmoothLayer);
};
DomElements.applyBtn.addEventListener("click", handleReload);
DomElements.gpsLayer.addEventListener("change", handleReload);
DomElements.smoothLayer.addEventListener("change", handleReload);
DomElements.slidingWindow.addEventListener("change", handleReload);
DomElements.threshold.addEventListener("change", handleReload);

window.ol = ol;
window._map = map;
