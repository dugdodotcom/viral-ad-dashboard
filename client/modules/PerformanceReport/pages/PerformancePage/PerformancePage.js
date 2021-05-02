import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import component
import SalesLast30days from '../../components/SalesLast30days/SalesLast30days';
import SalesByProduct from '../../components/SalesByProduct/SalesByProduct';
import TopPerformanceBySales from '../../components/TopPerformanceBySales/TopPerformanceBySales';
import ClicksLast30days from '../../components/ClicksLast30days/ClicksLast30days';
import ClicksByProduct from '../../components/ClicksByProduct/ClicksByProduct';
import TopPerformanceByClicks from '../../components/TopPerformanceByClicks/TopPerformanceByClicks';

// // Import Action
import { fetchSalesByDays } from '../../PerformanceReportActions';

// // Import Reducer
import { getSalesByDays } from '../../PerformanceReportReducer';


export class PerformancePage extends Component {

  componentDidMount() {
    if (!this.props.salesByDays || this.props.salesByDays.length == 0) {
      this.props.dispatch(fetchSalesByDays());
    } 
  }

  render() {
    
    return (
      <div className="row">
        <div className="col-12">
          <h1>Sales</h1>
        </div>
        <div className="col-6">
          <SalesLast30days />
          <SalesByProduct />
        </div>
        <div className="col-6">
          <TopPerformanceBySales />
        </div>

        <div className="col-12">
          <h1>Clicks</h1>
        </div>
        <div className="col-6">
          <ClicksLast30days />
          <ClicksByProduct />
        </div>
        <div className="col-6">
          <TopPerformanceByClicks />
        </div>
      </div>
    );
  }
}
// Actions required to provide data for this component to render in sever side.
PerformancePage.need = [() => { return fetchSalesByDays(); }];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    salesByDays: getSalesByDays(state)
  };
}

PerformancePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.object,
};

export default connect(mapStateToProps)(PerformancePage);
