const MainModel = require('../main-model');
const app = require('../../server');

class AccountModel extends MainModel {
  constructor(Model) {
    super(Model);
  }

  /**
   * Validations rules
   */
  validationRules() {}

  /**
   * Remote methods
   */
  remoteMethods() {}

  /**
   * Operation hooks (observers)
   */
  operationHooks() {}

  /**
   * Remote hooks
   */
  remoteHooks() {}

};

module.exports = AccountModel;
