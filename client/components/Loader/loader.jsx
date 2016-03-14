'use strict';

import './loader.less';

class Loader extends React.Component {

  calculateStyle(angle) {
    return {
      WebkitTransform: 'rotate(' + angle + 'deg) translate(0,-60px)',
      transform: 'rotate(' + angle + 'deg) translate(0,-60px)'
    };
  }

  render() {
    return (
      <div className="loader" style={{ WebkitTransform: 'scale(0.5)' }}>
        { _.range(0, 360, 360 / 10).map(angle => <div key={angle} style={this.calculateStyle(angle)}></div>) }
      </div>
    );
  }
}

export default Loader;
