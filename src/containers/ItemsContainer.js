import { connect } from 'react-redux';
import Items from '../components/Items';

function mapStateToProps(state) {
  return { items: state.items };
}

export default connect(mapStateToProps)(Items);
