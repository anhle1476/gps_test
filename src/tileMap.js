import { Tile as TileLayer } from "ol/layer";
import { XYZ } from "ol/source";
import { Projection } from "ol/proj";
import TileGrid from "ol/tilegrid/TileGrid";
import LayerGroup from "ol/layer/Group";

export const naverNormal = new TileLayer({
	id: "naver_normal_map",
	title: "Naver Normal Map",
	type: "basic",
	contrast: "naver_satellite_map",
	source: new XYZ({
		projection: "EPSG:3857",
		url: "https://map.pstatic.net/nrb/styles/basic/{z}/{x}/{y}@2x.png?mt=bg.ol.ts.lko",
		crossOrigin: "anonymous",
	}),
});

export const naverSatellite = new TileLayer({
	id: "naver_satellite_map",
	title: "Naver Satellite Map",
	type: "satellite",
	contrast: "naver_normal_map",
	source: new XYZ({
		projection: "EPSG:3857",
		url: "https://map.pstatic.net/nrb/styles/satellite/{z}/{x}/{y}@2x.png?mt=bg.ol.ts.lko",
		crossOrigin: "anonymous",
	}),
});

export const vworldNormal = new TileLayer({
	id: "vworld_normal_map",
	title: "VWorld Normal Map",
	type: "basic",
	contrast: "vworld_satellite_map",
	source: new XYZ({
		projection: "EPSG:3857",
		url: "http://xdworld.vworld.kr:8080/2d/Base/service/{z}/{x}/{y}.png",
		crossOrigin: "anonymous",
	}),
});

export const vworldSatellite = new TileLayer({
	id: "vworld_satellite_map",
	title: "VWorld Satellite Map",
	type: "satellite",
	contrast: "vworld_normal_map",
	source: new XYZ({
		projection: "EPSG:3857",
		url: "https://xdworld.vworld.kr/2d/Satellite/service/{z}/{x}/{y}.jpeg",
		crossOrigin: "anonymous",
	}),
});

export const vworldSatelliteOverlay = new TileLayer({
	id: "vworld_satellite_map",
	title: "VWorld Satellite Map",
	type: "satelliteOverlay",
	source: new XYZ({
		projection: "EPSG:3857",
		url: "https://xdworld.vworld.kr/2d/Hybrid/service/{z}/{x}/{y}.png",
		crossOrigin: "anonymous",
	}),
});

export const vworldHybrid = new LayerGroup({
	layers: [vworldSatellite, vworldSatelliteOverlay],
});

export const kakaoExtent = [-30000, -60000, 494288, 988576];
const kakaoResolutions = [
	2048, 1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1, 0.5, 0.25,
];
export const kakaoProj = new Projection({
	code: "EPSG:5181",
	units: "m",
});
const kakaoGrid = new TileGrid({
	origin: [kakaoExtent[0], kakaoExtent[1]],
	resolutions: kakaoResolutions,
});

export const kakaoNormal = new TileLayer({
	id: "kakao_normal_map",
	title: "Kakao Normal Map",
	type: "basic",
	contrast: "kakao_satellite_map",
	source: new XYZ({
		projection: kakaoProj,
		tileGrid: kakaoGrid,
		tileUrlFunction: function (tileCoord) {
			let url = "https://map{0-3}.daumcdn.net/map_2d/2203tof/L{z}/{y}/{x}.png";

			let s = Math.floor(Math.random() * 4); // 0 ~ 3

			let level = kakaoResolutions.length - tileCoord[0];

			return url
				.replace("{0-3}", s)
				.replace("{z}", level.toString())
				.replace("{x}", tileCoord[1].toString())
				.replace("{y}", (-tileCoord[2] - 1).toString());
		},
	}),
});

export const kakaoSatellite = new TileLayer({
	id: "kakao_satellite_map",
	title: "Kakao Satellite Map",
	type: "satellite",
	contrast: "kakao_normal_map",
	source: new XYZ({
		projection: kakaoProj,
		tileGrid: kakaoGrid,
		tileUrlFunction: function (tileCoord) {
			let url =
				"https://map{0-3}.daumcdn.net/map_skyview/L{z}/{y}/{x}.jpg?v=160114";

			let s = Math.floor(Math.random() * 4); // 0 ~ 3

			let level = kakaoResolutions.length - tileCoord[0];

			return url
				.replace("{0-3}", s)
				.replace("{z}", level.toString())
				.replace("{x}", tileCoord[1].toString())
				.replace("{y}", (-tileCoord[2] - 1).toString());
		},
	}),
});

export const kakaoSatelliteOverlay = new TileLayer({
	id: "kakao_satellite_map",
	title: "Kakao Satellite Map",
	type: "satelliteOverlay",
	source: new XYZ({
		projection: kakaoProj,
		tileGrid: kakaoGrid,
		tileUrlFunction: function (tileCoord) {
			let url =
				"https://map{0-3}.daumcdn.net/map_hybrid/2203tof/L{z}/{y}/{x}.png";

			let s = Math.floor(Math.random() * 4); // 0 ~ 3

			let level = kakaoResolutions.length - tileCoord[0];

			return url
				.replace("{0-3}", s)
				.replace("{z}", level.toString())
				.replace("{x}", tileCoord[1].toString())
				.replace("{y}", (-tileCoord[2] - 1).toString());
		},
	}),
});

export const kakaoHybrid = new LayerGroup({
	layers: [kakaoSatellite, kakaoSatelliteOverlay],
});

export const kakaoRoadView = new TileLayer({
	id: "kakao_road_view",
	title: "Kakao RoadView Layer",
	source: new XYZ({
		projection: kakaoProj,
		tileGrid: kakaoGrid,
		tileUrlFunction: function (tileCoord) {
			let url =
				"https://map{0-3}.daumcdn.net/map_roadviewline/7.00/L{z}/{y}/{x}.png";

			let s = Math.floor(Math.random() * 4); // 0 ~ 3

			let level = kakaoResolutions.length - tileCoord[0];

			return url
				.replace("{0-3}", s)
				.replace("{z}", level.toString())
				.replace("{x}", tileCoord[1].toString())
				.replace("{y}", (-tileCoord[2] - 1).toString());
		},
	}),
});