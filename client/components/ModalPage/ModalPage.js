import React, { Component } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';

export class ModalPage extends Component {
  render() {
    return (
      <div className="modal fade" id="my-modal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-page" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {this.props.children}
              
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ModalPage.propTypes = {
  children: PropTypes.object,
};


export default ModalPage;
