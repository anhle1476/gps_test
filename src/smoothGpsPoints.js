import { DomElements } from "./domElements";

export function smoothGPSPoints(points) {
	const windowSize = Number(DomElements.slidingWindow.value) || 3;
	const thresholdRadiusM = Number(DomElements.threshold.value) || 2;

	/**
	 * in WGS84 (aka EPSG:4326). As a rule of thumb, for Paris :
	 * 1 degree of longitude corresponds to 73km
	 * 1 degree of latitude corresponds to 111km
	 * https://gis.stackexchange.com/a/289137
	 */
	const lonPdopThreshold = thresholdRadiusM / 73000;
	const latPdopThreshold = thresholdRadiusM / 111000;

	const smoothedPoints = [];
	for (let i = 0; i < points.length; i++) {
		let sumLon = 0;
		let sumLat = 0;
		let totalWeight = 0;

		for (
			let j = Math.max(0, i - windowSize);
			j <= Math.min(i + windowSize, points.length - 1);
			j++
		) {
			const pdopWeight = 1 / points[j].pdop; // Higher weight for lower PDOP
			const speedWeight = points[j].speed; // Higher weight for higher speed
			const combinedWeight = pdopWeight * speedWeight; // Combine weights, adjust formula as needed

			sumLon += points[j].lon * combinedWeight;
			sumLat += points[j].lat * combinedWeight;
			totalWeight += combinedWeight;
		}

		// Ensure the smoothed point stays within the range of PDOP
		let smoothedLon = sumLon / totalWeight;
		let smoothedLat = sumLat / totalWeight;

		const lonDiff = Math.abs(smoothedLon - points[i].lon);
		const latDiff = Math.abs(smoothedLat - points[i].lat);

		// If the smoothed point deviates too much from the original, adjust it towards the original point
		if (lonDiff > lonPdopThreshold) {
			const diffRatio = lonDiff / lonPdopThreshold;
			smoothedLon = points[i].lon + (smoothedLon - points[i].lon) / diffRatio;
		}
		if (latDiff > latPdopThreshold) {
			const diffRatio = latDiff / latPdopThreshold;
			smoothedLat = points[i].lat + (smoothedLat - points[i].lat) / diffRatio;
		}

		smoothedPoints.push({
			...points[i],
			smooth_lon: smoothedLon,
			smooth_lat: smoothedLat,
		});
	}
	return smoothedPoints;
}
