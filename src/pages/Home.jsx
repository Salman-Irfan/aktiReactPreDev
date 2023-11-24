import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../store/slices/counterSlice'
import { setAuthToken ,removeAuthToken } from '../store/slices/authTokenSlice'

const Home = () => {
    const count = useSelector((state) => state.counter.value)
    const authToken = useSelector((state) => state.authToken.authToken)
    const dispatch = useDispatch()
    // Use useEffect to set the initial value of authToken from local storage
    useEffect(() => {
        const storedAuthToken = localStorage.getItem('authtoken')
        if (storedAuthToken) {
            dispatch(setAuthToken(storedAuthToken))
        }
    }, [dispatch])
    return (
        <>
            Home
            <div className="container">
                <button
                    aria-label="Increment value"
                    onClick={() => dispatch(increment())}
                >
                    Increment
                </button>
                <span>{count}</span>
                <button
                    aria-label="Decrement value"
                    onClick={() => dispatch(decrement())}
                >
                    Decrement
                </button>
            </div>
            {/* auth token */}
            <div>
                {authToken ? (
                    <div>
                        <p>Authenticated with token: {authToken}</p>
                        <button onClick={() => dispatch(removeAuthToken())}>
                            Logout (Remove Auth Token)
                        </button>
                    </div>
                ) : (
                    <p>Not authenticated</p>
                )}
            </div>
        </>
    );
};

export default Home;
