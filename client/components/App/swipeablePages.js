import { withRouter } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';

import WritePage from './../WritePage/writePage.jsx';
import ExplorePage from './../Explore';
import SearchPage from './../Search';

class SwipeablePages extends React.Component {

  constructor() {
    super();

    this.handleChangeIndex = this.handleChangeIndex.bind(this);

    this.pages = [
      '/write',
      '/explore',
      '/search'
    ];

    this.state = {
      index: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    const urlParts = nextProps.location.pathname.split('/');
    this.setState({ index: _.indexOf(this.pages, '/' + urlParts[1]) });
  }

  handleChangeIndex(index) {
    this.setState({ index });
    this.props.history.push(this.pages[index]);
  }

  render() {
    return (
      <SwipeableViews
        index={this.state.index}
        onChangeIndex={this.handleChangeIndex}
        animateTransitions={Boolean(window.ontouchstart)}
        containerStyle={{ height: '100%' }}
        style={{ height: '100%' }} // eslint-disable-line react/forbid-component-props
      >
        <WritePage />
        <ExplorePage />
        <SearchPage />
      </SwipeableViews>
    );
  }
}

SwipeablePages.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
};

export default withRouter(SwipeablePages);
