interface copymodaldata {
    shorturl:string
}

type copymodaltype = {
    type: "copy",
    data: copymodaldata
}



type onclosemodaltype = "onclose"
export type reducerActionType = onclosemodaltype | copymodaltype

type modalType = "copy" | null;


export type reducerContextType = {
    type: modalType,
    data?: {
        shorturl?: copymodaldata
    }
}