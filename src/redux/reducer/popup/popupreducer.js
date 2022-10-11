const IS_VISIBLE = "IS_VISIBLE";
const IS_NOT_VISIBLE = "IS_NOT_VISIBLE";

const initailState = {
    isVisible : false,
    type : "",
    message : ""
}

const popupReducer = (state = initailState, action) => {
    switch(action.type){
        case IS_VISIBLE : return {
            isVisible : true,
            type : action.payload.popupType,
            message : action.payload.msg
        }

        case IS_NOT_VISIBLE : return{
            isVisible : false,
            type : "",
            message : ""
        }

        default : return state
    }
}

export const popupVisible = (message, type) => {
    return {
        type : IS_VISIBLE,
        payload : {msg : message, popupType : type}
    }
}

export const popupNotVisible = () => {
    return {
        type : IS_NOT_VISIBLE
    }
}

export default popupReducer