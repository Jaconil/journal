import './loader.less';

const LOADER_DEGREES = 360;
const LOADER_STEP = 10;

/**
 * Renders element style given its angle
 *
 * @param {integer} angle - Element angle
 * @returns {object} Element style
 */
function calculateStyle(angle) {
  return {
    WebkitTransform: 'rotate(' + angle + 'deg) translate(0, -60px)',
    transform: 'rotate(' + angle + 'deg) translate(0, -60px)'
  };
}

/**
 * Renders the loader
 *
 * @returns {Object} Component
 */
function Loader() {
  const elements = _.range(0, LOADER_DEGREES, LOADER_DEGREES / LOADER_STEP).map(angle => {
    return <div key={angle} style={calculateStyle(angle)} />;
  });

  return <div className="loader" style={{ WebkitTransform: 'scale(0.5)' }}>{elements}</div>;
}

export default Loader;
