import React, {ChangeEvent} from "react";

interface Props {
    label: string;
    placeholder: string;
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<Props> = (props) => {
    const {label, placeholder, handleChange} = props;

    return (
        <div className="field">
            <label className="label">{label}</label>
            <div className="control">
                <input className="input" type="text" placeholder={placeholder}
                       onChange={handleChange}/>
            </div>
        </div>
    );
}

export default Input;
