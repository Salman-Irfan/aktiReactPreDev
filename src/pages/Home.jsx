import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from '../store/slices/counterSlice';
import { setAuthToken, removeAuthToken } from '../store/slices/authTokenSlice';
import { Button, Container } from 'react-bootstrap';
import { useSpring, animated } from 'react-spring';
import '../styles/home.css';

const Home = () => {
    const count = useSelector((state) => state.counter.value);
    const authToken = useSelector((state) => state.authToken.authToken);
    const dispatch = useDispatch();

    // Use useEffect to set the initial value of authToken from local storage
    useEffect(() => {
        const storedAuthToken = localStorage.getItem('authtoken');
        if (storedAuthToken) {
            dispatch(setAuthToken(storedAuthToken));
        }
    }, [dispatch]);

    // Define spring animation for count
    const countAnimation = useSpring({
        number: count,
        from: { number: 0 },
    });

    return (
        <>
            <Container className="my-4">
                <div className="d-flex align-items-center">
                    <Button
                        variant="primary"
                        className="mx-2"
                        onClick={() => dispatch(increment())}
                    >
                        Increment
                    </Button>

                    {/* Animated count using react-spring */}
                    <animated.span className="mx-2 count" style={{ fontSize: countAnimation.number.to(n => `${n}px`) }}>
                        {countAnimation.number.to(n => Math.round(n))}
                    </animated.span>

                    <Button
                        variant="danger"
                        className="mx-2"
                        onClick={() => dispatch(decrement())}
                    >
                        Decrement
                    </Button>
                </div>

                {/* Auth token */}
                <div className="mt-4">
                    {authToken ? (
                        <div>
                            <p className="authenticated-msg">Authenticated with token</p>
                            <p className="auth-token">{authToken}</p>
                            <button className="logout-btn" onClick={() => dispatch(removeAuthToken())}>
                                Logout (Remove Auth Token)
                            </button>
                        </div>
                    ) : (
                        <p className="not-authenticated-msg">Not authenticated</p>
                    )}
                </div>
            </Container>
        </>
    );
};

export default Home;
