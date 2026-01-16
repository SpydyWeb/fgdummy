const EMAILMNGDETAILSOBJ = "EmailMngDetailsObj";

const EmailMngDetailsObj=(payload)=>{
    return{
        type:EMAILMNGDETAILSOBJ,
        payload
    }
}
let initialState = {
    user: null,
    deviceToken: null,
    EmailMngDetailsObj:{}
};
const EmailMngReducer = (state, action) => {
    if (!state) {
        state = {
          ...initialState,
          ...state
        }
      }
    switch (action.type) {
       
        case EMAILMNGDETAILSOBJ:
            return { ...state, EmailMngDetailsObj: action.payload };
        default:
            return state;
    }
}

export default EmailMngReducer;
export { EmailMngDetailsObj };