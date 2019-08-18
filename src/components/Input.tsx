import React, { ChangeEvent } from "react";

interface Props {
    name: string;
    label: string;
    placeholder: string;
    handleChange: (event: ChangeEvent) => void;
};
interface State { };

export default class Input extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }
    render() {
        return (
            <div className="field">
                <label className="label">{this.props.label}</label>
                <div className="control">
                    <input name={this.props.name} className="input" type="text" placeholder={this.props.placeholder} onChange={this.props.handleChange} />
                </div>
            </div>
        );
    }
}