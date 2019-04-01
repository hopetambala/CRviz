import {
  default as controls,
  setControls,
  setStartDataset,
  setEndDataset,
  setHierarchyConfig,
  showNodes,
  useDarkTheme,
  colorBy,
  selectControls
} from "./controls";
import { combineReducers } from "redux";
import { expect } from "chai"

const reducer = combineReducers({ controls });

describe("Controls reducer", () => {
  
  describe("setControls", () => {
    it("sets the Control tree", (done) => {
      const controls = {
        'hierarchyConfig': [{ path: ["uid"], displayName: "UID" }],
        'shouldShowNodes': false,
        'darkTheme': true,
        'colorBy': { path: ["uid"], displayName: "UID" },
        'start': 't0',
        'end': 'tn',
      }

      const action = setControls(controls);
      const result = reducer({}, action);

      expect(selectControls(result)).to.deep.equal(controls);

      done();
    });
  });

  describe("set start and end datasets", () => {
    it("set the start dataset", (done) => {
      const action = setStartDataset('t0');
      const result = reducer({}, action);
      expect(selectControls(result).start).to.equal('t0');

      done();
    });

    it("set the end dataset", (done) => {
      const action = setEndDataset('tn');
      const result = reducer({}, action);
      expect(selectControls(result).end).to.equal('tn');

      done();
    });
  });

  describe("setHierarchyConfig", () => {
    it("sets the hierarchy config", (done) => {
      const hierarchyConfig = [{ path: ["uid"], displayName: "UID" }];
      const action = setHierarchyConfig(hierarchyConfig);
      const result = reducer({}, action);

      expect(selectControls(result)).to.deep.equal({
        hierarchyConfig: hierarchyConfig,
        shouldShowNodes: true,
        darkTheme: false,
        colorBy: null,
        'start': null,
        'end': null,
      });

      done();
    });
  });

  describe("showNodes", () => {
    it("set showNodes to false", (done) => {
      const action = showNodes(false);
      const result = reducer({}, action);
      expect(selectControls(result).shouldShowNodes).to.equal(false);

      done();
    });

    it("set showNodes to true", (done) => {
      const action = showNodes(true);
      const result = reducer({}, action);
      expect(selectControls(result).shouldShowNodes).to.equal(true);

      done();
    });
  });

  describe("useDarkTheme", () => {
    it("set useDarkTheme to false", (done) => {
      const action = useDarkTheme(false);
      const result = reducer({}, action);
      expect(selectControls(result).darkTheme).to.equal(false);

      done();
    });

    it("set useDarkTheme to true", (done) => {
      const action = useDarkTheme(true);
      const result = reducer({}, action);
      expect(selectControls(result).darkTheme).to.equal(true);

      done();
    });
  });

  describe("colorBy", () => {
    const field = { path: ["uid"], displayName: "UID" };
    const action = colorBy(field);
    const result = reducer({}, action);
    expect(selectControls(result).colorBy).to.equal(field);

  });
});
