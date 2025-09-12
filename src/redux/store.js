import { configureStore } from '@reduxjs/toolkit';

import balanceSlice from './slices/balanceSlice';
import orderSlice from './slices/orderSlice';


const store = configureStore({
    reducer:{
        // 余额 reducer
        balance: balanceSlice,
        order: orderSlice
        // 交易记录 reducer
        // 用户信息 reducer
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: false // 禁用序列化检查
        })
});

export default store;