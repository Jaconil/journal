import { connect } from 'react-redux';

import { submit } from '../../actionCreators/search';

import './searchPage.less';

const KEY_ENTER = 13;

class SearchPage extends React.Component {

  constructor(props) {
    super(props);
    this.onSearchInputKeyDown = this.onSearchInputKeyDown.bind(this);
  }

  onSearchInputKeyDown(event) {
    if (event.keyCode === KEY_ENTER && !event.shiftKey && this.searchInput.value.length > 0) {
      event.preventDefault();
      this.props.dispatch(submit(this.searchInput.value));
    }
  }

  render() {
    return (
      <section className="page searchPage">
        <div className="searchContainer">
          <div className="searchInput animated fadeIn">
            <input
              type="text"
              autoFocus
              ref={element => this.searchInput = element}
              onKeyDown={this.onSearchInputKeyDown}
            />
          </div>
        </div>
      </section>
    );
  }
}

export default connect()(SearchPage);
