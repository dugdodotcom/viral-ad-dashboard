import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { ENV } from '../../../../../config/LocalEnvironment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { browserHistory } from 'react-router';

// import component
import { Form } from '../../../Form/pages/Form';
import ModalPage from '../../../../components/ModalPage/ModalPage';
import $ from 'jquery';

// // Import style
import style from './SetupPage.css';

// // Import Action
import { setObject, addWebpageRequest, fetchWebpage } from '../../MyWebpageActions';

// // Import Reducer
import { getSetup } from '../../MyWebpageReducer';


export class SetupPage extends Component {

  componentDidMount() {
    if (this.props.setup) {
      this.props.dispatch(fetchWebpage());
    }
    $('#my-modal').on('hidden.bs.modal', function (e) {
      browserHistory.push('/sell/my-webpage');
    })

    if (this.props.location.pathname != "/sell/my-webpage") {
      $('#my-modal').modal('show');
    }
  }

  handleSubmit = () => {
    let formData = new FormData();
    formData.append('webpage[ig_handle]', this.refs.ig_handle.value);
    formData.append('webpage[page_name]', this.props.page_name);
    console.log(this.props.setup.cover)
    if (this.props.setup.cover && !this.props.setup.cover.url) {
      formData.append('webpage[cover]', this.props.setup.cover);
    }
    formData.append('webpage[description]', this.refs.description.value);
    formData.append('webpage[video_link]', this.refs.video_link.value);
    if (this.props.setup.logo && !this.props.setup.logo.url) {
      formData.append('webpage[logo]', this.props.setup.logo);
    }
    this.props.dispatch(addWebpageRequest(formData));
  }

  addLink() {
    console.log("add")
    this.props.dispatch(addLink({}))
  }

  handleCoversChange() {
    this.props.dispatch(setObject({key: 'cover', value: this.CoversField.files[0]}))
  }

  handleLogossChange() {
    this.props.dispatch(setObject({key: 'logo', value: this.LogosField.files[0]}))
  }

  openModal(url) {
    $('#my-modal').modal('show');
    browserHistory.push(url);
  }

  render() {
    console.log(this.props)
    return (
      <div className="row">
        <ModalPage children={this.props.children}/>
        <div className={`col-12 mt-2 pb-2 ${style['border-setup']}`}>
          <h4>
            <FormattedMessage id="createEcommerce" />
          </h4>
          <h4>
            <FormattedMessage id="makeMoney" /> <FontAwesomeIcon icon="heart" />.
          </h4>
          <div className="col-3 float-right">
            <button type="button" className="btn btn-outline-info btn-block">View Sample</button>
          </div>
        </div>
        <div className="col-12 mt-4">
          <Form submit={this.handleSubmit}>

            <div className='row'>
              <div className='col-12'>
                <div className='form-group row'>
                  <label htmlFor='ig-handle' className='col-sm-3 col-form-label'>
                    Your IG Handle
                  </label>
                  <div className='col-sm-4'>
                    <input
                      required
                      name='ig_handle'
                      type='text'
                      className={'form-control'}
                      id='ig-handle'
                      placeholder='@someone'
                      ref='ig_handle'
                      defaultValue={this.props.setup.ig_handle}
                    />
                    <div className={'invalid-feedback'} />
                  </div>
                </div>
              </div>
            </div>

            <div className='row'>
              <div className='col-12'>
                <div className='form-group row'>
                  <label htmlFor='page-name' className='col-sm-3 col-form-label'>
                    Page Name
                  </label>
                  <div className='col-sm-4'>
                    {this.props.setup.page_name}
                  </div>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-12'>
                <div className='form-group row'>
                  <label htmlFor='choose-products' className='col-sm-3 col-form-label'>
                    Choose Products
                  </label>
                  <div className='col-sm-4'>
                    <button type="button" className="btn btn-outline-primary" onClick={() => this.openModal('/sell/my-webpage/product-list')}>From our list of products</button>
                      <p className="text-center">or</p>
                    <button type="button" className="btn btn-outline-success">From your IG posts</button>
                      <p className="text-center">or</p>
                    <button type="button" className="btn btn-outline-info" onClick={() => this.openModal('/sell/my-webpage/your-own')}>Upload your own</button>
                  </div>
                </div>
              </div>
            </div>

            <div className='row'>
              <div className='col-12'>
                <div className='form-group row'>
                  <label htmlFor='cover-photo' className='col-sm-3 col-form-label'>
                    Personalize the Page
                  </label>
                  <div className='col-sm-6'>
                    <div className="custom-file">
                      
                      <input 
                        ref={field => (this.CoversField = field)}
                        type="file" 
                        className="custom-file-input" 
                        accept="image/*"
                        id="cover-photo" 
                        onChange={e => this.handleCoversChange(e)}
                      />
                      <label className="custom-file-label" htmlFor="cover-photo">Choose file 600 x 300 px</label>
                    </div>

                    {this.props.setup.cover&&
                      <img
                        width={150}
                        src={this.props.setup.cover.url ? ENV.apiUrl + this.props.setup.cover.url : URL.createObjectURL(this.props.setup.cover)}
                        style={{ alignSelf: 'center' }}
                      />
                    }
                  </div>
                </div>
                
              </div>
            </div>

            <div className='row'>
              <div className='col-12'>
                <div className='form-group row'>
                  <label htmlFor='description' className='col-sm-3 col-form-label'>
                    Write a Short Description
                  </label>
                  <div className='col-sm-5'>
                    <textarea 
                      required
                      className="form-control" 
                      id="description" 
                      rows="2" 
                      placeholder='Input Short Description' 
                      ref='description'
                      defaultValue={this.props.setup.description}
                    >
                    </textarea>
                    <div className={'invalid-feedback'} />
                  </div>
                </div>
              </div>
            </div>

            <div className='row'>
              <div className='col-12'>
                <div className='form-group row'>
                  <label htmlFor='video-link' className='col-sm-3 col-form-label'>
                    Upload a Video of Your Choice
                  </label>
                  <div className='col-sm-4'>
                    <input
                      name='video_link'
                      type='text'
                      className={'form-control'}
                      id='video-link'
                      placeholder='Youtube link'
                      ref='video_link'
                      defaultValue={this.props.setup.video_link}
                    />
                    <div className={'invalid-feedback'} />
                  </div>
                </div>
              </div>
            </div>

            <div className='row'>
              <div className='col-12'>
                <div className='form-group row'>
                  <label htmlFor='logo' className='col-sm-3 col-form-label'>
                    Upload a Logo if Any
                  </label>
                  <div className='col-sm-6'>
                    <div className="custom-file">
                      
                      <input 
                        ref={field => (this.LogosField = field)}
                        type="file" 
                        className="custom-file-input" 
                        accept="image/*"
                        id="logo" 
                        onChange={e => this.handleLogossChange(e)}
                      />
                      <label className="custom-file-label" htmlFor="logo">Choose file 250mb</label>
                    </div>

                    {this.props.setup.logo&&
                      <img
                        width={150}
                        src={this.props.setup.logo.url ? ENV.apiUrl + this.props.setup.logo.url : URL.createObjectURL(this.props.setup.logo)}
                        style={{ alignSelf: 'center' }}
                      />
                    }
                  </div>
                </div>
                
              </div>
            </div>

            <button type={'submit'} className={'btn btn-primary mt-5'}>
              Done
            </button>
          </Form>
        </div>
        
      </div>
    );
  }
}
// Actions required to provide data for this component to render in sever side.
SetupPage.need = [() => { return fetchWebpage(); }];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    setup: getSetup(state)
  };
}

SetupPage.propTypes = {
  setup: PropTypes.shape({
    ig_handle: PropTypes.string,
    page_name: PropTypes.string,
    cover: PropTypes.object,
    description: PropTypes.string,
    video_link: PropTypes.string,
    logo: PropTypes.object,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.object,
};

export default connect(mapStateToProps)(SetupPage);
