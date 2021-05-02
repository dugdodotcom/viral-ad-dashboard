import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux';
import { ENV } from '../../../../../config/LocalEnvironment';

// import component
import { Form } from '../../../Form/pages/Form'

// Import Selectors
import { getFormProgress, getFormComplete, getIsSubmittingForm, getShipping, getCharge, getImages, getImageChanges } from '../../EcommerceReducer';

// import actions
import { setImage, toggleShipping, toggleCharge } from '../../EcommerceActions';

export class ProductForm extends Component {
  constructor (props) {
    super(props);
    this.props = props
    this.state = {
      onShipping: false
    }
  }

  submitProduct = () => {
    console.log("submit");
    const categoryIdRef = this.refs.category_id;
    const nameRef = this.refs.name;
    const descriptionRef = this.refs.description;
    const priceRef = this.refs.price;
    const quantityRef = this.refs.quantity;
    const marginPerSaleRef = this.refs.margin_per_sale;
    const profitPerVisitorRef = this.refs.profit_per_visitor;
    const shippingDetailsRef = this.refs.shipping_details;
    const shippingChargesRef = this.refs.shipping_charges;
    const sizesRef = this.refs.sizes;
    const colourRef = this.refs.colour;
    if (
      categoryIdRef.value && 
      nameRef.value && 
      descriptionRef.value && 
      priceRef.value && 
      quantityRef.value && 
      marginPerSaleRef.value &&
      profitPerVisitorRef.value &&
      shippingDetailsRef.value &&
      shippingChargesRef.value
    ) {
      this.props.saveProduct(
        categoryIdRef.value,
        nameRef.value,
        descriptionRef.value, 
        priceRef.value, 
        quantityRef.value, 
        marginPerSaleRef.value,
        profitPerVisitorRef.value,
        shippingDetailsRef.value,
        shippingChargesRef.value,
        sizesRef.value,
        colourRef.value
      )
    }
  }

  categoryOption = category => {
    return <option value={category.id} key={category.id}>{category.name}</option>
  }

  getNumberOfSelectedFiles() {
    console.log(this.props.images)
    if (this.props.images) {
      return this.props.images.filter(el => {
        return el._destroy !== true;
      }).length;
    }
  }

  renderUploadCoversButton() {
    let numberOfSelectedCovers = this.getNumberOfSelectedFiles();
    return (
      <div>
        <input
          name="product_images[]"
          ref={field => (this.bookCoversField = field)}
          type="file"
          disabled={this.props.isSubmittingForm}
          multiple={true}
          accept="image/*"
          style={{
            width: 0.1,
            height: 0.1,
            opacity: 0,
            overflow: 'hidden',
            position: 'absolute',
            zIndex: -1
          }}
          id="book_covers"
          onChange={e => this.handleBookCoversChange(e)}
          className="form-control"
        />
        <label
          disabled={this.props.isSubmittingForm}
          className="btn btn-success"
          htmlFor="book_covers">
          <span className="glyphicon glyphicon-cloud-upload" />
          &nbsp; &nbsp;
          {numberOfSelectedCovers === 0
            ? 'Upload Files'
            : `${numberOfSelectedCovers} file${numberOfSelectedCovers !== 1
                ? 's'
                : ''} selected`}
        </label>
        <span>Upload new image max 250mb. shape: square only</span>
      </div>
    );
  }

  renderSelectedBookCoverFiles() {
    if (this.props.images) {
      let fileDOMs = this.props.images.map((el, index) => {
        if (el._destroy) {
          return null;
        }
  
        return (
          <li key={index}>
            <div className="photo">
              <img
                width={150}
                src={el.id ? ENV.apiUrl + el.url : URL.createObjectURL(el)}
                style={{ alignSelf: 'center' }}
              />
              <div
                className="remove"
                onClick={() => this.removeSelectedBookCoverFile(el, index)}>
                <span style={{ top: 2 }} className="glyphicon glyphicon-remove" />
              </div>
            </div>
            <div className="file-name">
              {el.name}
            </div>
          </li>
        );
      });
  
      return (
        <ul className="selected-covers">
          {fileDOMs}
        </ul>
      );
    } 
  }

  renderUploadFormProgress() {
    if (this.props.isSubmittingForm === false) {
      return null;
    }

    return (
      <div className="progress mt-1">
        <div
          className={
            'progress-bar progress-bar-info progress-bar-striped' +
            (this.props.formProgress < 100 ? 'active' : '')
          }
          role="progressbar"
          aria-valuenow={this.props.formProgress}
          areavaluemin="0"
          areavaluemax="100"
          style={{ width: this.props.formProgress + '%' }}>
          {this.props.formProgress}% Complete
        </div>
      </div>
    );
  }

  removeSelectedBookCoverFile(cover, index) {
    let { images } = this.props;
    if (cover.id) {
      images[index]._destroy = true;
    } else {
      images.splice(index, 1);
    }

    this.props.dispatch(setImage(images));
  }

  handleBookCoversChange() {
    console.log(this.bookCoversField);
    let selectedFiles = this.bookCoversField.files;
    let { images } = this.props;
    for (let i = 0; i < selectedFiles.length; i++) {
      images.push(selectedFiles.item(i));
    } //end for
    this.props.dispatch(setImage(images));
    this.bookCoversField.value = null;
  }

  toggleShipping() {
    this.props.dispatch(toggleShipping())
  }

  renderShipping() {
    let days = [];
    for (var i = 1; i < 30 ; i++) {
      days.push(i);
    }
    return (
      <div className='col-sm-4'>
        <div className={`input-group`}>
          <select 
            className="custom-select" 
            ref='shipping_details' 
            id='shipping-details' 
            defaultValue={this.props.product.shipping_details}
            required
          >
            <option value="">Select One</option>
            {days.map(day =>
              <option value={day} key={day}>{day}</option>
            )}
          </select>
          <span className="mt-2 ml-2">days</span>
        </div>
        
        <div className={'invalid-feedback'} />
      </div>
    )
  }

  toggleCharge() {
    this.props.dispatch(toggleCharge())
  }

  renderCharge() {
    return (
      <div className='col-sm-4'>
        <div className={`input-group`}>
          <input
            required
            name='shipping_charges'
            type='number'
            className={'form-control'}
            id='shipping-charges'
            placeholder='IDR'
            ref='shipping_charges'
            defaultValue={this.props.product.shipping_charges}
            step="0.01"
          />
          <span className="mt-2 ml-2">IDR</span>
          
        </div>

        <div className={'invalid-feedback'} />
      </div>
    )
  }

  render () {
    let percentage = [];
    for (var i = 1; i < 100 ; i++) {
      percentage.push(i);
    }
    
    const shipping = this.props.shipping ? 'd-block' : 'd-none';
    return (
      <div className="BookForm">
        <Form submit={ this.submitProduct }>

          <div className='row'>
            <div className='col-9'>
              <div className='form-group row'>
                <label htmlFor='category' className='col-sm-4 col-form-label'>
                  Product Category
                </label>
                <div className='col-sm-4'>
                  <select className="custom-select" ref='category_id' id='category' defaultValue={this.props.product.category_id}>
                    {this.props.categories.map(category =>
                      this.categoryOption(category)
                    )}
                  </select>
                  <div className={'invalid-feedback'} />
                </div>
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col-12'>
              <div className='form-group row'>
                <label htmlFor='product-name' className='col-sm-3 col-form-label'>
                  Product Name
                </label>
                <div className='col-sm-4'>
                  <input
                    required
                    name='name'
                    type='text'
                    className={'form-control'}
                    id='product-name'
                    placeholder='Input Product Name'
                    ref='name'
                    defaultValue={this.props.product.name}
                  />
                  <div className={'invalid-feedback'} />
                </div>
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col-12'>
              <div className='form-group row'>
                <label htmlFor='product-description' className='col-sm-3 col-form-label'>
                  Product Description
                </label>
                <div className='col-sm-5'>
                  <textarea 
                    required
                    className="form-control" 
                    id="product-description" 
                    rows="2" 
                    placeholder='Input Product Description' 
                    ref='description'
                    defaultValue={this.props.product.description}
                  >
                  </textarea>
                  <div className={'invalid-feedback'} />
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className='col-12'>
              <div className='form-group row'>
                <label htmlFor='product-price' className='col-sm-3 col-form-label'>
                  Selling Price
                </label>
                <div className='col-sm-4'>
                  <input
                    required
                    name='price'
                    type='number'
                    className={'form-control'}
                    id='product-price'
                    placeholder='Input Selling Price'
                    ref='price'
                    defaultValue={this.props.product.price}
                    step="0"
                  />
                  <div className={'invalid-feedback'} />
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className='col-12'>
              <div className='form-group row'>
                <label htmlFor='product-quantity' className='col-sm-3 col-form-label'>
                  Quantity
                </label>
                <div className='col-sm-4'>
                  <input
                    required
                    name='quantity'
                    type='number'
                    className={'form-control'}
                    id='product-quantity'
                    placeholder='Input Quantity'
                    ref='quantity'
                    defaultValue={this.props.product.quantity}
                    step="0"
                  />
                  <div className={'invalid-feedback'} />
                </div>
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col-12'>
              <div className='form-group row'>
                <label htmlFor='margin-per-sale' className='col-sm-3 col-form-label'>
                  Influencer margin per sale
                </label>
                <div className='input-group col-sm-3'>
                  <select 
                    className="custom-select" 
                    ref='margin_per_sale' 
                    id='margin-per-sale' 
                    defaultValue={this.props.product.margin_per_sale} 
                    required
                  >
                    <option value="">Select One</option>
                    {percentage.map(percent =>
                      <option value={percent} key={percent}>{percent}</option>
                    )}
                  </select>
                  <span className="mt-2 ml-2">%</span>
                  <div className={'invalid-feedback'} />
                </div>
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col-12'>
              <div className='form-group row'>
                <label htmlFor='profit-per-visitor' className='col-sm-3 col-form-label'>
                  Influencer profit for per unique visitor
                </label>
                <div className='input-group col-sm-3'>
                  <select 
                    className="custom-select" 
                    ref='profit_per_visitor' 
                    id='profit-per-visitor' 
                    defaultValue={this.props.product.profit_per_visitor}
                    required
                  >
                    <option value="">Select One</option>
                    {percentage.map(percent =>
                      <option value={percent} key={percent}>{percent}</option>
                    )}
                  </select>
                  <span className="mt-2 ml-2">%</span>
                  <div className={'invalid-feedback'} />
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className='col-12'>
              <div className='form-group row'>
                <label htmlFor='product-price' className='col-sm-3 col-form-label'>
                  Images
                </label>
                <div className='col-sm-9'>
                  {this.renderUploadCoversButton()}
                  {this.renderSelectedBookCoverFiles()}
                </div>
              </div>
              
            </div>
          </div>

          <div className="row">
            <div className='col-12'>
              <div className='form-group row'>
                <label htmlFor='shipping-details' className='col-sm-3 col-form-label'>
                  Shipping details
                </label>
                {this.renderShipping()}
              </div>
            </div>
          </div>

          <div className="row">
            <div className='col-12'>
              <div className='form-group row'>
                <label htmlFor='shipping-charges' className='col-sm-3 col-form-label'>
                  Shipping charges
                </label>
                {this.renderCharge()}
              </div>
            </div>
          </div>
          
          <div className='row'>
            <div className='col-12'>
              <div className='form-group row'>
                <label htmlFor='sizes' className='col-sm-3 col-form-label'>
                  Size (optional)
                </label>
                <div className='input-group col-sm-7'>
                  <input
                    name='sizes'
                    type='text'
                    className={'form-control'}
                    id='sizes'
                    placeholder='Separate input by comma'
                    ref='sizes'
                    defaultValue={this.props.product.sizes}
                  />
                  <span className="mt-2 ml-2">E.g S, M, XL, L, 32, 34, 38</span>
                  <div className={'invalid-feedback'} />
                </div>
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col-12'>
              <div className='form-group row'>
                <label htmlFor='margin-per-sale' className='col-sm-3 col-form-label'>
                  Colour (optional)
                </label>
                <div className='input-group col-sm-9'>
                  <input
                    name='colour'
                    type='text'
                    className={'form-control'}
                    id='colour'
                    placeholder='Separate input by comma'
                    ref='colour'
                    defaultValue={this.props.product.colour}
                  />
                  <span className="mt-2 ml-2">E.g Magenta, Purple, Ultramarine, Lima</span>
                  <div className={'invalid-feedback'} />
                </div>
              </div>
            </div>
          </div>
          
          <button type={'submit'} className={'btn btn-primary mt-5'}>
            <FormattedMessage id='submit' />
          </button>

          {/* {this.renderUploadFormProgress()} */}
        </Form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    formProgress: getFormProgress(state),
    formComplete: getFormComplete(state),
    isSubmittingForm: getIsSubmittingForm(state),
    shipping: getShipping(state),
    charge: getCharge(state),
    imageChange: getImageChanges(state),
  };
}

ProductForm.propTypes = {
  product: PropTypes.object,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired
    })
  ).isRequired,
  images: PropTypes.array,
  saveProduct: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default connect(mapStateToProps)(ProductForm);
