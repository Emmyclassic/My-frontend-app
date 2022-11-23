import axios from ""

export const apiRequestMiddleware = ({dispatch, getState } ) => (next ) => (action) => {

    if (action.type === "API_REQUEST"){
        const { entity, method, url } = action.payload.meta;

    }
}