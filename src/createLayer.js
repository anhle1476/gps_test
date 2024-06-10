import { Feature } from "ol";
import {
	LineString as LineStringGeometry,
	Point as PointGeometry,
} from "ol/geom";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";
import { kakaoProj } from "./tileMap";

export function createPointSource(points) {
	const pointVectorSource = new VectorSource();
	points.forEach((coord) => {
		const pointGeometry = new PointGeometry(coord);
		const pointFeature = new Feature({
			geometry: pointGeometry,
		});
		pointVectorSource.addFeature(pointFeature);
	});

	return pointVectorSource;
}

export function createLineSource(points) {
	// Create a LineString geometry from the transformed coordinates
	const lineString = new LineStringGeometry(points);

	// Create a feature with the LineString geometry
	const feature = new Feature({
		geometry: lineString,
	});

	// Source for the vector layer
	return new VectorSource({
		features: [feature],
	});
}

export function createPointLayer(points, color = "blue") {
	const source = createPointSource(points);

	const pointStyle = new Style({
		image: new CircleStyle({
			radius: 2,
			fill: new Fill({
				color: color,
			}),
			stroke: new Stroke({
				color: "#fff",
				width: 1,
			}),
		}),
	});

	return new VectorLayer({
		source: source,
		style: pointStyle,
		projection: kakaoProj,
	});
}

export function createLineLayer(points, color = "blue") {
	const source = createLineSource(points);

	const style = new Style({
		stroke: new Stroke({
			color: color,
			width: 2,
		}),
	});

	return new VectorLayer({
		source: source,
		style: style,
		projection: kakaoProj,
	});
}
