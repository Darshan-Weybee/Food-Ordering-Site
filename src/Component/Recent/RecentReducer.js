const initialState = [];
let isThere = false;
let lcData = [];

const RecentReducer = (state = initialState, action) => {
    isThere = false;
    let temp = JSON.parse(localStorage.getItem("recent"));
    temp = temp !== null ? temp : initialState;

    console.log("recent", temp);

    switch(action.type){
        
        case "ADD_RECENT_ITEMS" : 
        
        temp = temp.map(st => {

            if(action.payload.id === st.data.id){
                isThere = true;
                return {
                    data : action.payload,
                    num : st.num + 1,
                    typeOfItem : action.typeOfItem
                }
            }
            return st;
        })
        console.log(action);
        lcData =  isThere ? temp : [...temp, {data : action.payload, typeOfItem : action.typeOfItem, num : 1}]
        localStorage.setItem("recent", JSON.stringify(lcData));
        return lcData;

        default : return temp;
    }
}

export function addRecentItems(data, type){
    return {
        type : "ADD_RECENT_ITEMS",
        payload : data,
        typeOfItem : type
    }
}

export default RecentReducer