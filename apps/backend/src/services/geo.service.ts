export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface SlaEstimate {
  distanceKm: number;
  etaMinutes: number;
  isServiceable: boolean;
  serviceZone: string;
}

export class GeoService {
  /**
   * Calculate distance between two coordinates using the Haversine formula
   */
  static calculateDistance(coord1: Coordinates, coord2: Coordinates): number {
    const toRad = (value: number) => (value * Math.PI) / 180;
    const R = 6371; // Earth's radius in km

    const dLat = toRad(coord2.latitude - coord1.latitude);
    const dLon = toRad(coord2.longitude - coord1.longitude);
    const lat1 = toRad(coord1.latitude);
    const lat2 = toRad(coord2.latitude);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;

    return Math.round(d * 10) / 10; // Round to 1 decimal place
  }

  /**
   * Estimate SLA delivery time based on distance
   * Average quick commerce dark store model:
   * 2 mins store packing + 18 km/h rider velocity (~3.3 mins per km)
   */
  static estimateSla(storeCoord: Coordinates, customerCoord: Coordinates): SlaEstimate {
    const distanceKm = this.calculateDistance(storeCoord, customerCoord);
    const maxServiceableRadiusKm = 5.0; // 5 km max delivery radius

    if (distanceKm > maxServiceableRadiusKm) {
      return {
        distanceKm,
        etaMinutes: 0,
        isServiceable: false,
        serviceZone: 'Outside Service Radius',
      };
    }

    // Packing time: 2 mins, Ride time: ~2.5 mins per km in city
    const estimatedMinutes = Math.min(15, Math.max(8, Math.round(2 + distanceKm * 2.8)));

    return {
      distanceKm,
      etaMinutes: estimatedMinutes,
      isServiceable: true,
      serviceZone: distanceKm <= 2.5 ? '⚡ 10-Min Superfast Express' : '⚡ 12–15 Min Standard Express',
    };
  }
}
