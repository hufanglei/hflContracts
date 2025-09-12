
import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";

const ETHER_ADDRESS = '0x0000000000000000000000000000000000000000';

const initialState = {
  balance: 0,
};

const balanceSlice = createSlice({
  name: "balance",   // type: balance/get
  initialState:{
      TokenWallet: "0", // wei转换，需要字符串， 不是数字0
      TokenExchange: "0",
      EtherWallet: "0",
      EtherExchange: "0"
  },
  reducers: {
    setTokenWallet: (state, action) => {
      state.TokenWallet = action.payload;
    },
    setTokenExchange: (state, action) => {
      state.TokenExchange = action.payload;
    },
    setEtherWallet: (state, action) => {
      state.EtherWallet = action.payload;
    },
    setEtherExchange: (state, action) => {
      state.EtherExchange = action.payload;
    },
  },
});

export const { setTokenWallet, setTokenExchange, setEtherWallet, setEtherExchange } = balanceSlice.actions;

export default balanceSlice.reducer;

export const loadBalanceData = createAsyncThunk(
    "balance/fetchBalanceData",
     async(data, {dispatch}) => {
        console.log("loadBalanceData",data);
        const { web3, account, token, exchange } = data;

        console.log("loadBalanceData",web3, account, token, exchange);

        // 获取钱包的token
        try{
            const TokenWallet = await token.methods.balanceOf(account).call();
            console.log("TokenWallet", TokenWallet);
            dispatch(setTokenWallet(TokenWallet));

        }catch(e){
            console.log("error", e);
        }


        console.log("11111");

        // 获取交易所的token
        const TokenExchange = await exchange.methods.balanceOf(token.options.address, account).call();
        dispatch(setTokenExchange(TokenExchange));
        console.log("2222");

        // 获取钱包的ether
        const EtherWallet = await web3.eth.getBalance(account);
        dispatch(setEtherWallet(EtherWallet));
        console.log("3333");

        // 获取交易所的ether
        const EtherExchange = await exchange.methods.balanceOf(ETHER_ADDRESS, account).call();
        console.log(EtherExchange);
        dispatch(setEtherExchange(EtherExchange));


    }
)