import { createAsyncThunk, createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit';
import { RootState } from '@/store/store.ts';

export interface CounterState {
    value: number;
    status: string;
    error: string | SerializedError | null;
}

const initialState: CounterState = {
    status: 'uninitialized',
    value: 0,
    error: null,
};

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        // Use the PayloadAction type to declare the contents of `action.payload`
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(incrementByAmountAsync.pending, (state) => {
                state.status = 'loading';
            })
            // Pass the generated action creators to `.addCase()`
            .addCase(incrementByAmountAsync.fulfilled, (state, action) => {
                // Same "mutating" update syntax thanks to Immer
                state.status = 'succeeded';
                state.value = action.payload;
            })
            .addCase(incrementByAmountAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.value = 0;
                state.error = action.error;
            });
    },
});

export const incrementByAmountAsync = createAsyncThunk(
    'counter/incrementByAmountAsync',
    async (number: number) => {
        const response: number = number;
        await stall(); // stalls for the default 3 seconds
        await stall(500); // stalls for 1/2 a second
        return response;
    });

async function stall(stallTime = 3000) {
    await new Promise(resolve => setTimeout(resolve, stallTime));
}

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export const selectCount = (state: RootState) => state.counter.value;
export default counterSlice.reducer;