import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { ENV } from '../../../../../config/LocalEnvironment';

// Import style
import style from './SellReviewPage.css';

// Import Action
import { fetchProduct } from '../../../EcommerceProduct/EcommerceActions';
import { addLink, addPayoutRequest } from '../../SellActions';

// Import Reducer
import { getProduct } from '../../../EcommerceProduct/EcommerceReducer';
import { getLinks, getPerformances } from '../../SellReducer';


export class SellReviewPage extends Component {

  // componentDidMount() {
  //   if (!this.props.product) {
  //     this.props.dispatch(fetchProduct(this.props.params.id));
  //   } 
  // }

  requestPayout = event => {
    event.preventDefault();
    let links = []
    for(let i=1;i < this.props.links.length;) {
      links.push(
        {
          url: this.refs[`links[${i}].url`].value,
          active: this.refs[`links[${i}].active`].value,
          product_id: this.props.params.id
        }
      )
      i ++;
    }
    this.props.dispatch(addPayoutRequest({ links: links }));
  };

  addLink(){
    console.log("add")
    this.props.dispatch(addLink({}))
  }

  render() {
    console.log(this.props)
    return (
      <form onSubmit={this.requestPayout} className="row" ref={form => this.form = form}>
        <div className="col-12 mt-2">
          <button type="button" className="btn btn-outline-primary d-inline">Review</button>
          <h3 className="d-inline pt-1">{this.props.product.name}</h3>
        </div>

        <div className="col-12 mt-4">
          <h4>Instruction</h4>
          <p>
            <FormattedMessage id="instructionHow" />
          </p>
        </div>

        <div className="col-12">
          <h4>Insert this link</h4>
          <input
            disabled
            type='text'
            className={'form-control col-9 float-left'}
            id='product-link'
            defaultValue={`${ENV['mainPage']}/${this.props.product.id}`}
          />
          <button type="button" className="btn btn-outline-dark btn-block col-2 ml-2 float-left">Copy Link</button>
        </div>

        <div className="col-12 mt-4">
          <h4>Copy paste posting</h4>
          <ol className={style['ol-style']}>
            {
              this.props.links.map((links, index) => (
                <li key={index} className="pl-4">
                  <div className="row">
                    <input
                      name="links[]url"
                      type='text'
                      className={'form-control col-9'}
                      id='product-link'
                      defaultValue={links.url}
                      ref={`links[${index}].url`}
                    />
                    <div className="col-2">
                      <div className="form-check">
                        <input 
                          name="links[]active" 
                          className="form-check-input" 
                          type="checkbox" 
                          value="true" 
                          ref={`links[${index}].active`}
                        />
                      </div>
                    </div>
                  </div>
                  
                </li>
              ))
            }
          </ol>
          <a onClick={() => this.addLink()} className={style['link-style']}>
            + more links
          </a>
        </div>
        <div className="col-12 mt-4">
          <h4>Your link performance</h4>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Date</th>
                <th scope="col">Purchase</th>
                <th scope="col">Visit</th>
                <th scope="col">Total</th>
              </tr>
            </thead>
            <tbody>
              {
                this.props.performances.map((performance, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{performance.date}</td>
                    <td>{performance.purchase}</td>
                    <td>{performance.visit}</td>
                    <td>{performance.total}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
        <div className="col-12">
          <button type={'submit'} className={'btn btn-primary'}>
            Request Payout
          </button>
        </div>
      </form>
    );
  }
}
// Actions required to provide data for this component to render in sever side.
SellReviewPage.need = [params => { return fetchProduct(params.id); }];

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    product: getProduct(state, props.params.id),
    links: getLinks(state, props.params.id),
    performances: getPerformances(state, props.params.id),
  };
}

SellReviewPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(SellReviewPage);
