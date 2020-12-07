import React from 'react'

function ListErrors(props) {
    const errors=props.errors;
    if(errors){
        return (
            <div>
                <ul className="error-messages">
                    {
                        Object.keys(errors).map(key=>{
                            return(
                                <li key={key}>
                                    {key} {errors[key]}
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }else{
        return null;
    }
}

export default ListErrors
