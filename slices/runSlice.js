import { createSlice } from '@reduxjs/toolkit'


const initialState = {
      position: null,
      currentRun: {
        distance: 0,
        time: 0,
      },
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
    setTotalTime: (state, action) => {
      // payload - information inside an action
      state.currentRun.time = action.payload;
    },
    setTotalDistance: (state, action) => {
      // payload - information inside an action
      state.currentRun.distance = action.payload;
    },
    
  
    
  },
});

// Action creators are generated for each case reducer function
export const { setLocation, setTotalTime, setTotalDistance } = 
runSlice.actions;

// Selectors - pull information from the data layout
// One selector for each item in the initialState
// direct return - arrow function
export const selectLocation = (state) => state.runMap.position;
export const selectTotalTime = (state) => state.runMap.currentRun.time;
export const selectTotalDistance = (state) => state.runMap.currentRun.distance;



export default runSlice.reducer;