import React from 'react';
import { connect } from 'react-redux';
import { startSetCategories } from '../actions/categories';
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SimpleMenu from './SimpleMenu'

export class CategoryList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
    };
  }
  async componentDidMount() {
    try {
      if (!this.props.categories.list) {
        await this.props.startSetCategories();
      }
    } catch (e) {
      this.setState({ error: e.message });
    }
  }
  
  render() {
    return (
    <nav style={{display:"flex"}}>
      {this.props.categories.length >=1 ? this.props.categories.map(category => (
        <SimpleMenu category={category} />
        )
      ): null}
    </nav>
      )
  }
}

const mapStateToProps = state => ({
  categories: state.categories,
});

const mapDispatchToProps = dispatch => ({
  startSetCategories: () => dispatch(startSetCategories())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryList);
