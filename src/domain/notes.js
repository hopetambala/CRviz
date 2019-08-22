import { createAction, handleActions } from "redux-actions";

const defaultState = {
  byId:[],
  byHash: {
  },
  hoverStatus:false,
  hoveredNoteId:'',
  tags:[]
};

// ACTIONS
const addNote = createAction("ADD_NOTE");
const setNotes = createAction("SET_NOTE");
const removeNote = createAction("REMOVE_NOTE");
const toggleNotesHover = createAction("TOGGLE_NOTES_HOVER");
const setNoteHovered = createAction("SET_HOVERED_NOTED");
const addTag = createAction("ADD_TAG");

// REDUCERS
const reducer = handleActions(
  {
    [addNote]: (state, { payload }) => {
      return {
        ...state,
        byId: [ ...state.byId, payload.id],
        byHash: {
          ...state.byHash,
          [payload.id]: payload
        }
      }
    },
    [removeNote]: (state, { payload }) => {
      const prunedIds = state.byId.filter(item => {
        return item !== payload.id 
      })
      delete state.byHash[payload.id] 
      
      return {
        ...state,
        byId: prunedIds,
        byHash: state.byHash
      }
    },

    [setNotes]: (state, { payload }) => {
      const byid = payload.byId || state.byId;
      const byhash = payload.byHash || state.byHash;
      const tags = payload.tags || state.tags;
      return {
        ...state,
        byId: byid,
        byHash: byhash,
        tags: tags
      }
    },
    [toggleNotesHover]: (state, { payload }) => {
      const hoverStatus = payload;
      return {
        ...state,
        hoverStatus: hoverStatus,
      }
    },
    [setNoteHovered]: (state, { payload }) => {
      const hoveredNoteId = payload;
      return {
        ...state,
        hoveredNoteId: hoveredNoteId,
      }
    },
    [addTag]: (state, { payload }) => {
      return {
        ...state,
        tags: [...state.tags, payload]
      }
    },
  },
  defaultState
);

// SELECTORS
const getNotesIndexedByHash = (state) => state.notes.byHash;
const getAllNotes = (state) => state.notes;
const getNotesHoverStatus = (state) => state.notes.hoverStatus;
const getNoteHoveredId = (state) => state.notes.hoveredNoteId;
const getTags = (state) => state.notes.tags;


export default reducer;

export { 
  addNote,setNotes,removeNote, getNotesIndexedByHash, getAllNotes, toggleNotesHover, getNotesHoverStatus, setNoteHovered, getNoteHoveredId,
  addTag, getTags
};