import app from '../../bootstrap';
import template from './loader-icon.template.html';
import './loader-icon.styles.scss';

class LoaderIconCtrl {
  $onChanges() {
    if (this.resolve) {
      this.showLoader = true;
      this.resolve.then(
        () => {
          this.showLoader = false;
        },
        () => {
          this.showLoader = false;
        }
      );
    } else {
      this.showLoader = false;
    }
  }
}

app.component('pfcLoaderIcon', {
  template,
  transclude: true,
  controller: LoaderIconCtrl,
  bindings: {
    resolve: '<',
    type: '@',
  },
});
