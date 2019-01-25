export class PlaceRequest {
    id: string;
    name: string;
    description: string;
    location: GeoJsonPoint;
    pictureUrl: string;
    tripId: string;
  }

export class GeoJsonPoint {
    type: string;
    coordinates: number[];
}