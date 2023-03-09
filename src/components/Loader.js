import React from 'react'

function Loader({ loading }) {
    return (
        <>
            {
                loading ? <div class="spinner-border" show={loading} role="status" >
                    <span class="visually-hidden">Loading...</span>
                </div> : null
            }
        </>
    )
}

export default Loader