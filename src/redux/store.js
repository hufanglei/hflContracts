import { configureStore, congigureStore } from '@reduxjs/toolkit';

import balanceSlice from './slices/balanceSlice';

const store = configureStore({
    reducer:{
        // 余额 reducer
        balance: balanceSlice   
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