
import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";


const orderSlice = createSlice({
  name: "order",   // type: balance/get
  initialState:{
      CancerOrders:[],
      FillOrders:[],
      AllOrders:[]
  },
  reducers: {
    setCancerOrders: (state, action) => {
      state.CancerOrders = action.payload;
    },
    setFillOrders: (state, action) => {
      state.FillOrders = action.payload;
    },
    setAllOrders: (state, action) => {
      state.AllOrders = action.payload;
    }
  },
});

export const { setCancerOrders, setFillOrders, setAllOrders} = orderSlice.actions;

export default orderSlice.reducer;

export const loadCancelOrderData = createAsyncThunk(
    "order/fetchCancelOrderData",
     async(data, {dispatch}) => {
        const { exchange } = data;

        // console.log(await exchange.methods.orders(1).call())

        const result = await exchange.getPastEvents('Cancel', {
            fromBlock: 0,
            toBlock: 'latest'
        })

        const cancelOrders = result.map(item=>item.returnValues)

        // console.log(cancerOrders)

        dispatch(setCancerOrders(cancelOrders))

    }
)

export const loadAllOrderData = createAsyncThunk(
    "order/fetchAllOrderData",
     async(data, {dispatch}) => {
        const { exchange } = data;

        // console.log(await exchange.methods.orders(1).call())

        const result = await exchange.getPastEvents('Order', {
            fromBlock: 0,
            toBlock: 'latest'
        })

        const allOrders = result.map(item=>item.returnValues)


        dispatch(setAllOrders(allOrders))

    }
)


export const loadFillOrderData = createAsyncThunk(
    "order/fetchFillOrderData",
     async(data, {dispatch}) => {
        const { exchange } = data;

        // console.log(await exchange.methods.orders(1).call())

        const result = await exchange.getPastEvents('Trade', {
            fromBlock: 0,
            toBlock: 'latest'
        })

        const fillOrders = result.map(item=>item.returnValues)


        dispatch(setFillOrders(fillOrders))

    }
)