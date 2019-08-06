import React from 'react';

interface Props {
    Active: boolean;
    closeModal: Function;
};
interface State { };

export default class Modal extends React.Component<Props, State> {
    render() {
        return (
            <div className={`modal ${this.props.Active ? 'is-active' : ''}`}>
                <div className="modal-background" onClick={() => this.props.closeModal()}></div>
                <div className="modal-content">
                    {this.props.children}
                </div>
                <button className="modal-close is-large" aria-label="close" onClick={() => this.props.closeModal()}></button>
            </div>
        );
    }
}