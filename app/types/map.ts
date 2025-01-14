export interface PolygonFeature {
  properties: {
    TxtMemo: string;
    SHAPE_Area: number;
    分區: string;
  };
  geometry: {
    type: "Polygon";
    coordinates: number[][][];
  };
}