'use strict';

import './loader.less';

const LOADER_DEGREES = 360;
const LOADER_STEP = 10;

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
        {_.range(0, LOADER_DEGREES, LOADER_DEGREES / LOADER_STEP).map(angle => <div key={angle} style={this.calculateStyle(angle)}></div>)}
      </div>
    );
  }
}

export default Loader;
