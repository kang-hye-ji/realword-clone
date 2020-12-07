import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import {
    onChangeEmail,
    onChangePassword,
    onChangeUsername,
    submitForm,
    onUnloaded
} from '../../_actions/auth_action'
import ListErrors from './ListErrors'

function Register() {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth)
    useEffect(() => {
        return () => {
            dispatch(onUnloaded())
        }
    },[])
    const onSubmit=(e)=>{
        e.preventDefault();
        dispatch(submitForm(auth.username, auth.email, auth.password))
    }
    return (
        <div className="auth-page">
            <div className="container-page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">Sign Up</h1>
                        <p className="text-xs-center">
                            <Link to="/login">
                                Have an account?
                            </Link>
                        </p>
                    
                        <ListErrors errors={auth.errors}/>

                        <form onSubmit={onSubmit}>
                            <fieldset className="form-group">
                                <input
                                    className="form-control form-control-lg"
                                    type="text"
                                    placeholder="Username"
                                    value={auth.username}
                                    onChange={
                                        e=>dispatch(onChangeUsername(e.currentTarget.value))
                                    }
                                />
                            </fieldset>
                            <fieldset className="form-group">
                                <input
                                    className="form-control form-control-lg"
                                    type="email"
                                    placeholder="Email"
                                    value={auth.email}
                                    onChange={
                                        e=>dispatch(onChangeEmail(e.currentTarget.value))
                                    }
                                />
                            </fieldset>
                            <fieldset className="form-group">
                                <input
                                    className="form-control form-control-lg"
                                    type="password"
                                    placeholder="Password"
                                    value={auth.password}
                                    onChange={
                                        e=>dispatch(onChangePassword(e.currentTarget.value))
                                    }
                                />
                            </fieldset>
                            <button
                                className="btn btn-lg btn-primary pull-xs-right"
                                type="submit"
                                disabled={auth.inProgress}
                            >
                                Sign Up
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
