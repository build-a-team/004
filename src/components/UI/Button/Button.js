import React from 'react'

function IconButton(props) {
    return (
      <div onClick={props.onClick} >
        <img
          src={props.icon}
          className={'icon'}
        />
        <p className={'buttonLabel'}>
            {props.text}
        </p>
      </div>
    );
}
function TextButton(props) {
    return (
        <button onClick={props.onClick}>   
             {props.text}
         </button>
    ) 
}

const Button = props => {
    return (
        <div>
            {props.type === 'text' ?
             <TextButton {...props} /> :
             <IconButton {...props} />
            }  
        </div>
    )
}
Button.defaultProps = {
    type: 'text',
    text: 'text',
}


export default Button;
