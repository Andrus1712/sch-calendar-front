import { SDashboard } from '@/assets/styles/pages/private/dashboard/dashboard.styles.ts';
import { decrement, increment, incrementByAmountAsync } from '@/features/counter/counterSlice.ts';
import { useAppDispatch, useAppSelector } from '@/app/hooksStore.ts';
import FCalendar from '@/components/calendar/FCalendar.tsx';

const Dashboard = () => {
    // The `state` arg is correctly typed as `RootState` already
    const { value, status } = useAppSelector((state) => state.counter);
    const dispatch = useAppDispatch();
    
    return (
        <SDashboard>
            
            <div>
                <button
                    aria-label="Increment value"
                    onClick={() => dispatch(increment())}
                >
                    Increment
                </button>
                <span>{status === 'loading' ? 'loading' : value}</span>
                <button
                    aria-label="Decrement value"
                    onClick={() => dispatch(decrement())}
                >
                    Decrement
                </button>
                <button
                    aria-label="Random value"
                    onClick={() => dispatch(incrementByAmountAsync(Math.random()))}
                >
                    Random
                </button>
            </div>
            <FCalendar />
        </SDashboard>
    );
};

export default Dashboard;