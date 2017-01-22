import app from '../../bootstrap';
import template from './app.template.html';

export default class AppCtrl {
  constructor(apiService) {
    this.apiService = apiService;
    this.busy = false;
    this.error = false;
    this.model = {
      input: '',
      output: '',
    };
    this.editorOptions = {
      lineWrapping: true,
      lineNumbers: true,
      mode: 'python',
      theme: 'cobalt',
    };
  }
  isBusy() {
    return this.busy;
  }
  hasError() {
    return this.error;
  }
  sendCode() {
    this.busy = true;
    this.error = false;
    this.promise = this.apiService
      .submitPython(this.model.input).then(
        (response) => {
          this.model.output = response;
          this.busy = false;
        },
        () => {
          this.busy = false;
          this.error = true;
        }
      );
  }
}
AppCtrl.$inject = ['ApiService'];

app.component('app', { template, controller: AppCtrl });
