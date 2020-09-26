import React, {ChangeEvent} from "react";

interface Props {
    name: string;
    label: string;
    options: string[];

    handleChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const MultiSelect: React.FC<Props> = (props) => {
    const {name, label, options, handleChange} = props;

    let elements = options.map(o => <option key={o}>{o}</option>);
    elements.unshift(<option key="_theBlankOne"/>);

    return (
        <div className="field">
            <label className="label">{label}</label>
            <div className="control">
                <div className="select">
                    <select name={name} onChange={handleChange}>
                        {elements}
                    </select>
                </div>
            </div>
        </div>
    );
}

export default MultiSelect;
