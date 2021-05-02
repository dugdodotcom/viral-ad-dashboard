import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

// Import Selectors
import { getCategories } from '../../../Category/CategoryReducer';

// Import Action
import { fetchCategories } from '../../../Category/CategoryActions';

export class CategoryList extends Component {

  componentDidMount() {
    if (!this.props.categories || this.props.categories.length == 0) {
      this.props.dispatch(fetchCategories())
    }
  }

  render() {
    return (
      <li>
        <Link className="nav-link pl-0" activeClassName={'active'} to={'/sell'} >
          Sub Categories
        </Link>
        <ol className="pl-2">
          {this.props.categories.map(category =>
            <li key={category.id}>
              <Link className="nav-link pl-0" activeClassName={'active'} to={`/sell/category/${category.slug}`}  >
                {category.name}
              </Link>
            </li>
          )}
        </ol>
      </li>
    );
  }
  
}

// Actions required to provide data for this component to render in sever side.
CategoryList.need = [() => { return fetchCategories(); }];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    categories: getCategories(state),
  };
}

export default connect(mapStateToProps)(CategoryList);
