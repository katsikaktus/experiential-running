import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    origin: null,
    destination: null,
    travelTimeInformation:null
};

// Push information to the data layout

export const navSlice = createSlice({
  name: 'nav',
  initialState,
  // Inside the reducer: dispatching an action into the layout
  // Here actions: setOrigin, setDestination, setTravelTimeInformation
  reducers: {
    // state - current state
    // action - when I make that dispatch from the component to the
    // data layout
    setOrigin: (state, action) => {
        // payload - information inside an action
        state.origin = action.payload;
    },
    setDestination: (state, action) => {
        // payload - information inside an action
        state.destination = action.payload;
    },
    setTravelTimeInformation: (state, action) => {
        // payload - information inside an action
        state.travelTimeInformation = action.payload;
    },
    
  },
});

// Action creators are generated for each case reducer function
export const { setOrigin, setDestination, setTravelTimeInformation } = 
navSlice.actions;

// Selectors - pull information from the data layout
// One selector for each item in the initialState
// direct return - arrow function
export const selectOrigin = (state) => state.nav.origin;
export const selectDestination = (state) => state.nav.destination;
export const selectTravelTimeInformation = (state) => 
    state.nav.TravelTimeInformation;


export default navSlice.reducer;