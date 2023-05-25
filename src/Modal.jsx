import React, { Component } from 'react';
import PropTypes from 'prop-types';

// modal
class Modal extends Component {
  // define prop types
  static propTypes = {
    show:     PropTypes.bool,
    onClose:  PropTypes.func,
    children: PropTypes.any
  };

  // render component
  render() {
    return (
      <>
        {this.props.show &&
          <div
            className="modal-wrapper"
            onClick={this.props.onClose ?? (() => {})}
          >
            <div
              className="modal"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-content">
                {/* close button */}
                <div
                  className="modal-close"
                  onClick={this.props.onClose ?? (() => {})}
                >
                  ✕
                </div>

                {this.props.children}
              </div>
            </div>
          </div>
        }
      </>
    );
  }
}

export default Modal;
