function solution(bridge_length, weight, truck_weights) {
  const trucksOnBridge = [];
  let weightTotal = 0;
  let time = 0;

  const truckWeightQueue = [...truck_weights];

  while (truckWeightQueue.length > 0 || trucksOnBridge.length > 0) {
    if (
      truckWeightQueue.length > 0 &&
      weightTotal + truckWeightQueue[0] > weight
    ) {
      const skipTime = bridge_length - trucksOnBridge[0][1];
      trucksOnBridge.forEach((truck) => (truck[1] += skipTime));
      time += skipTime;
    } else {
      trucksOnBridge.forEach((truck) => truck[1]++);
      time++;
    }

    if (trucksOnBridge.length > 0 && trucksOnBridge[0][1] === bridge_length) {
      weightTotal -= trucksOnBridge[0][0];
      trucksOnBridge.shift();
    }

    if (
      truckWeightQueue.length > 0 &&
      weightTotal + truckWeightQueue[0] <= weight
    ) {
      const truckWeight = truckWeightQueue.shift();
      weightTotal += truckWeight;
      trucksOnBridge.push([truckWeight, 0]);
    }
  }

  return time;
}