import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import {
    onUnload
} from '../../../_actions/home_action'

function Home() {
    const dispatch = useDispatch();
    useEffect(() => {
        return () => {
            dispatch(onUnload())
        }
    },[])
    return (
        <div className="home-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-3">
                        <div className="sidebar">
                            <p>Popular Tags</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
