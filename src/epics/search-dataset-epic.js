import { is } from "ramda";
import { createAction } from "redux-actions";
import { ofType } from 'redux-observable';
import { of } from "rxjs";
import { mergeMap, map, tap, catchError } from 'rxjs/operators';
import { QueryParseError } from 'lunr';

import { setError } from "domain/error"
import { setSearchResults} from "./index-dataset-epic";

const searchDataset = createAction("SEARCH_DATASET");

const searchDatasetEpic = (action$, store) => {
  return action$.pipe(
      ofType(searchDataset.toString())
      ,mergeMap(({ payload }) => {
        return of(payload).pipe(
            tap(performSearch)
            ,map((payload) =>
              setSearchResults({
                queryString: payload.queryString,
                results: payload.results || []
              })
            )
            ,catchError((error) => {
              if (is(QueryParseError, error)) {
                return of(setError(error));
              } else {
                /* istanbul ignore next */
                throw error;
              }
            })
          );
      })
    );
};

const performSearch = (data) => {
  data.results = [];
  var toFind = data.queryString || '';
  const indices = data.searchIndices;
  var results = [];
  if(indices && toFind){
    for(var hash in indices){
      const idx = indices[hash];
      const idxResults = idx.search(toFind.toLowerCase());
      const temp = new Set([...results, ...idxResults]);
      results = [...temp];
    }
  }

  data.dataset.forEach((el) => { el.CRVIZ._isSearchResult = false; });
  results.forEach((r) => {
    const res = data.dataset.find(i => i.CRVIZ["_HASH_KEY"] === r.ref);
    if(res){
      res.CRVIZ._isSearchResult = true;
      data.results.push(res);
    }
  });
};

export default searchDatasetEpic;

export { searchDataset };
