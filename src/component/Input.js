import React from "react";


const Input = ({type, label, value, placeholder, handleChange, name, error, disabled}) => {
    return (
        <fieldset>
            <div>
                <label >{label}</label>
                <input type={type} value={value} placeholder={placeholder} onChange={handleChange} name={name} disabled={disabled}/>
                {error && <p>{error}</p>}
            </div>
        </fieldset>
    )
}

export default Input