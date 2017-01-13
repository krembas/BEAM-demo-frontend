import 'core-js/shim';
import angular from 'angular';
import angularSanitize from 'angular-sanitize';
import 'angular-ui-codemirror';

const app = angular.module('app', [
  angularSanitize,
  'ui.codemirror',
]);

app.config(['$compileProvider', ($compileProvider) => {
  $compileProvider.debugInfoEnabled(DEBUG);
}]);

angular.element(document).ready(() => {
  angular.bootstrap(document.body, ['app'], {
    strictDi: false,
  });
});

export default app;
