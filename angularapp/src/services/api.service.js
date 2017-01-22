import app from '../bootstrap';

class ApiService {
  constructor($q, $timeout, $http) {
    this.$q = $q;
    this.$timeout = $timeout;
    this.$http = $http;
  }
  submitPython(data) {
    const deferred = this.$q.defer();

    // this.$timeout(() => {
    //   deferred.resolve(data);
    //   return true;
    // }, 1000);

    this.$http({
      method: 'POST',
      url: API_URL,
      data,
    }).then(
      (response) => {
        deferred.resolve(response.data);
      },
      (response) => {
        deferred.reject(response);
      }
    );

    return deferred.promise;
  }
}
ApiService.$inject = ['$q', '$timeout', '$http'];

app.service('ApiService', ApiService);
