
const UPDATE_CHANGE = "updatechange";
const CLEARVALUES="clearvalues";
const POLICYDETAILSOBJ="policyDetailsObj";
const SENTDETAILSOBJ =  "sentDetailsObj";
const EMAILMNGDETAILSOBJ =  "EmailMngDetailsObj";
const updatechange = (payload) => {
    return {
        type: UPDATE_CHANGE,
        payload
    }
}
const clearvalues=(payload)=>{
    return {
        type: CLEARVALUES,
        payload
    }
}
const policyDetailsObj=(payload)=>{
    return{
        type:POLICYDETAILSOBJ,
        payload
    }
}
const sentDetailsObj=(payload)=>{
    return{
        type:SENTDETAILSOBJ,
        payload
    }
}
const EmailMngDetailsObj=(payload)=>{
    return{
        type:EMAILMNGDETAILSOBJ,
        payload
    }
}
const initialState = {
   isNew:false,
   policyDetailsObj:{},
   sentDetailsObj: {},
   EmailMngDetailsObj:{}
}

const PolicyDetailsReducer = (state, action) => {
    if (!state) {
        state = {
          ...initialState,
          ...state
        }
      }
    switch (action.type) {
        case UPDATE_CHANGE:
            state = { ...state, isNew: true };
            return state;
        case clearvalues:
            state = { ...state, isNew: false };
            return state;
        case POLICYDETAILSOBJ:
            state = { ...state, policyDetailsObj: action.payload };
            return state;   
        case SENTDETAILSOBJ:
            state = { ...state, sentDetailsObj: action.payload };
            return state;         
        case EMAILMNGDETAILSOBJ:
            state = { ...state, EmailMngDetailsObj: action.payload };
            return state;    
        default:
            return state;
    }

}

export default PolicyDetailsReducer;
export { updatechange,policyDetailsObj,EmailMngDetailsObj, sentDetailsObj }