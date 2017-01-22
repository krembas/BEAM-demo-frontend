
require('!script!codemirror/lib/codemirror');
require('!script!codemirror/mode/python/python');

require('codemirror/lib/codemirror.css');
require('codemirror/theme/cobalt.css');

function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

// Load Global styles
require('./styles/styles.scss');

// Load all modules
// requireAll(require.context('./config', true, /.js$/)); // Configuration
requireAll(require.context('./services', true, /service.js$/)); // Services
requireAll(require.context('./components', true, /component.js$/)); // Components
