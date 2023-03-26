function localStorageMatrices(props) {
  let storedMatrices = localStorage.getItem("Matrices");
  let json = storedMatrices !== null ? JSON.parse(storedMatrices) : "";
  if (json.length !== 0) {
    console.log(json);
    props.setC(json.C);
    props.setVL(json.VL);
    props.setF(json.F);
    props.setL(json.L);
    props.setT(json.T);
    props.setSyn(json.syn);
    props.setEnvSyn(json.envSyn);
  } else {
    console.log("No");
    props.setC([1, 1, 2]);
    props.setVL([1, 1, 2]);
    props.setF([
      [1, 1, 0],
      [0.5, 0.5, 0],
      [0, 0, 1],
      [0, 0, 0.5],
    ]);

    props.setL([
      [1, 0],
      [1, 0],
      [0, 1],
      [0, 1],
    ]);
    props.setT([[4, 4]]);
    props.setSyn([
      [1, 2],
      [2, 1],
    ]);
    props.setEnvSyn(2);
  }
}

export default localStorageMatrices;
