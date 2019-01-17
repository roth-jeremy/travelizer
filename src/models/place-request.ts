export class PlaceRequest {
    name: string;
    description: string;
    location: GeoJsonPoint;
    tripId: string;
  }

export class GeoJsonPoint {
    type: string;
    coordinates: number[];
}