
/**
 * Return a string that can be used to compare two datum are the same.
*/
const datumKey = (datum) => {
  if (datum.depth === 0) {
    return root;
  } else if (datum.height > 0) {
    return [datum.data.field.path.join("."), datum.data.fieldValue].join(".");
  } else {
    return datum.data.uid;
  }
};

export default datumKey;