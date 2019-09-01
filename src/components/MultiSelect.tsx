import React, { ChangeEvent } from "react";

interface Props {
    name: string;
    label: string;
    options: string[];

    handleChange: (event: ChangeEvent) => void;
};
interface State { };

export default class MultiSelect extends React.Component<Props, State> {
    render() {
        let options: JSX.Element[] = [];

        this.props.options.forEach(o => options.push(<option key={o}>{o}</option>));
        options.unshift(<option key="_theBlankOne"></option>);

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