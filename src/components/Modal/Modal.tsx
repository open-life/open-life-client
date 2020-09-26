import React from 'react';

interface Props {
    active: boolean;
    closeModal: Function;
}

const Modal: React.FC<Props> = (props) => {
    const {active, closeModal, children} = props;

    return (
        <div className={`modal ${active ? 'is-active' : ''}`}>
            <div className="modal-background" onClick={() => closeModal()}/>
            <div className="modal-content">
                {children}
            </div>
            <button className="modal-close is-large" aria-label="close" onClick={() => closeModal()}/>
        </div>
    );
}

export default Modal;
