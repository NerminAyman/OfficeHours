'use strict';

class MainModel {
  constructor(Model) {
    this._model = Model;
    this.validationRules();
    this.remoteMethods();
    this.operationHooks();
    this.remoteHooks();
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

module.exports = MainModel;
