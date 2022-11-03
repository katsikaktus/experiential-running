import { createSlice } from '@reduxjs/toolkit'
import { ListItem } from '@rneui/base';


const initialState = {
      position: null,
      currentRun: {
        distance: 0,
        time: 0,
        savedPath: []
      },
      savedPath:[],
      previousRuns: [],
      totalKms: 0,
      userName: '',
};

// Push information to the data layout

export const runSlice = createSlice({
  name: 'runMap',
  initialState,
  // Inside the reducer: dispatching an action into the layout
  // Here actions: setOrigin, setDestination, setTravelTimeInformation
  reducers: {
    // state - current state
    // action - when I make that dispatch from the component to the
    // data layout
    setLocation: (state, action) => {
      // payload - information inside an action
      state.position = action.payload;
    },
    /*setTotalTime: (state, action) => {
      // payload - information inside an action
      state.currentRun.time = action.payload;
    },
    setTotalDistance: (state, action) => {
      // payload - information inside an action
      state.currentRun.distance = action.payload;
    },*/
    setCurrentRun: (state, action) => {
      state.currentRun = action.payload;
    },

    saveRunToDatabase: (state, action) => {
      state.previousRuns.unshift(action.payload);
    },

    saveCurrentPath: (state, action) => {
      state.savedPath.unshift(action.payload);
    },

    clearCurrentPath: (state, action) => {
      state.savedPath = initialState.savedPath;
    },

    
  
    
  },
});

// Action creators are generated for each case reducer function
export const { setLocation, saveRunToDatabase, setCurrentRun, saveCurrentPath, clearCurrentPath } = 
runSlice.actions;

// Selectors - pull information from the data layout
// One selector for each item in the initialState
// direct return - arrow function
export const selectLocation = (state) => state.runMap.position;
/*export const selectTotalTime = (state) => state.runMap.currentRun.time;
export const selectTotalDistance = (state) => state.runMap.currentRun.distance;*/
export const selectPreviousRun = (state) => state.runMap.previousRuns;
export const selectCurrentRun = (state) => state.runMap.currentRun;
export const selectSavedCurrentPath = (state) => state.runMap.savedPath;

//export const selectCoordinatesCurrentRun = (state) => state.runMap.currentRun.coordinates;
//export const selectCoordinatesCurrentRun = (state) => state.runMap.bb;


export default runSlice.reducer;