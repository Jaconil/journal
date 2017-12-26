import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './searchInput.less';

const KEY_ENTER = 13;

class SearchInput extends React.Component {

  constructor(props) {
    super(props);
    this.onSearchInputKeyDown = this.onSearchInputKeyDown.bind(this);
  }

  onSearchInputKeyDown(event) {
    if (event.keyCode === KEY_ENTER && !event.shiftKey && this.searchInput.value.length > 0) {
      event.preventDefault();
      this.props.history.push(`/search/${encodeURIComponent(this.searchInput.value)}`);
    }
  }

  render() {
    return (
      <div className="searchInput animated fadeIn">
        <input
          type="text"
          ref={element => this.searchInput = element}
          onKeyDown={this.onSearchInputKeyDown}
        />
      </div>
    );
  }
}

export default withRouter(connect()(SearchInput));
