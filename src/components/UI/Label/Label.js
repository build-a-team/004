import React from 'react'

const Label = props => {
    return (
        <label>
            {props.text}
        </label>
    )
}
Label.defaultProps = {
    text: 'text'
}


export default Label;
