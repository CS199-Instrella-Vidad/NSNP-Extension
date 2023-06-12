export default function getSpikingNeurons(SV, L, PM) {
  // each element in L
  let spikingNeurons: any = [];
  let spikingFunctions: any = [];

  if (SV[0] !== undefined && PM !== undefined) {
    for (let i = 0; i < SV[0].length; i++) {
      let spiking = false;
      if (SV[0][i] === 0) {
        continue;
      }
      for (let j = 0; j < PM[0].length; j++) {
        if (PM[i][j] !== 0) {
          spiking = true;
        }
      }
      if (spiking) {
        spikingFunctions.push(i);
      }
    }
    console.log("spikingFunctions", spikingFunctions);
    spikingFunctions.forEach((element) => {
      L.forEach((e, index) => {
        if (index === element) {
          let index = e.findIndex((e) => e === 1);
          spikingNeurons.push(index + 1);
        }
      });
    });
  }
  console.log("spikingNeurons", spikingNeurons);
  return spikingNeurons;
}
