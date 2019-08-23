import React, { ChangeEvent, SyntheticEvent } from "react";

interface Props {
    name: string;
    label: string;
    options: string[];

    handleChange: (event: ChangeEvent) => void;
};
interface State { };

export default class MultiSelect extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }
    render() {
        let options: JSX.Element[] = [];

        this.props.options.forEach(o => options.push(<option>{o}</option>));
        options.unshift(<option></option>);

        return (
            <div className="field">
                <label className="label">{this.props.label}</label>
                <div className="control">
                    <div className="select">
                        <select name={this.props.name} onChange={this.props.handleChange}>
                            {options}
                        </select>
                    </div>
                </div>
            </div>
        );
    }
}