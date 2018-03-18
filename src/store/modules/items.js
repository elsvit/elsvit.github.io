// @flow
import get from 'lodash/get';

const GET_ITEMS: 'items/GET_ITEMS' = 'items/GET_ITEMS';
const GET_ITEMS_SUCCESS: 'items/GET_ITEMS_SUCCESS' =
    'items/GET_ITEMS_SUCCESS';
const GET_ITEMS_FAILED: 'items/GET_ITEMS_FAILED' =
    'items/GET_ITEMS_FAILED';

type GetItemsAction = {|
    type: typeof GET_ITEMS,
|};

type GetitemsuccessAction = {|
    type: typeof GET_ITEMS_SUCCESS,
    result: {
        data: Array<*>,
    },
|};

type GetitemsFailedAction = {|
    type: typeof GET_ITEMS_FAILED,
    error: {
    response: {
        data: {
            message: string,
        },
    },
},
|};

type itemsActions =
| GetItemsAction
| GetitemsuccessAction
| GetitemsFailedAction;

type itemState = {
    data: *,
    loading: boolean,
    error: ?string,
};

type InitialState = {
    items: itemState,
};

const initialState: InitialState = {
    items: {
        data: [],
        loading: false,
        error: null,
    },
};

export default function itemsReducer(
    state: InitialState = initialState,
    action: itemsActions,
): InitialState {
    switch (action.type) {
        case GET_ITEMS:
            return {
                ...state,
                data: [...state.items.data],
                error: null,
                loading: true,
            };

        case GET_ITEMS_SUCCESS:
            return {
                ...state,
                data: action.result.data,
                error: null,
                loading: false,
            };

        case GET_ITEMS_FAILED:
            return {
                ...state,
                data: [...state.items.data],
                loading: false,
                error: get(action.error, 'response.data.message', String(action.error)),
            };

        default:
            return state;
    }
}

// export function loadItems(): {
//     return {
//         type: API_REQUEST,
//         types: [GET_ITEMS, GET_ITEMS_SUCCESS, GET_ITEMS_FAILED],
//         call: () => api().items.get(),
//     };
// }
