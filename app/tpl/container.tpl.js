import React, {
  Component,
} from 'react'
import { connect } from 'react-redux'
import ComponentTpl from '../components/ComponentTpl.js'

class ComponentTplContainer extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ComponentTpl { ...this.props } />
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(ComponentTplContainer);