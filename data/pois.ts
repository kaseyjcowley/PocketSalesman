export type PointOfInterest = {
  id: number;
  title: string;
  description?: string;
  latitude: number;
  longitude: number;
  phone: string;
};

export const pointsOfInterest: PointOfInterest[] = [
  {
    id: 1,
    title: 'Dairy Queen',
    description: 'A great place to grill and chill',
    latitude: 37.17693,
    longitude: -113.30195,
    phone: '(435) 635-5952',
  },
  {
    id: 2,
    title: 'Costa Vida',
    description: 'Mexican Food at Affordable Prices',
    latitude: 37.17622,
    longitude: -113.30387,
    phone: '(435) 635-4007',
  },
  {
    id: 3,
    title: "Lupita's Mexican Grill",
    description: 'Homestyle Mexican Food',
    latitude: 37.1763,
    longitude: -113.28685,
    phone: '(435) 635-0206',
  },
  {
    id: 4,
    title: "McDonald's",
    description: 'Cheap Fast Food',
    latitude: 37.176993,
    longitude: -113.310703,
    phone: '(435) 635-0206',
  },
  {
    id: 5,
    title: "Wendy's",
    description: 'Cheap Fast Food',
    latitude: 37.17614,
    longitude: -113.309505,
    phone: '(435) 635-0206',
  },
  {
    id: 6,
    title: "Arby's",
    description: 'Cheap Fast Food',
    latitude: 37.176801,
    longitude: -113.307369,
    phone: '(435) 635-0206',
  },
];
