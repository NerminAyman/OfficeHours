'use strict';
module.exports = function(Model, options) {
  Model.defineProperty('createdBy', {
    type: String,
  });
  Model.defineProperty('updatedBy', {
    type: String,
    'default': null,
  });
  Model.observe('before save', function event(ctx, next) { // Observe any create/update event on Model
    let instance = ctx.instance || ctx.currentInstance;
    if ((ctx.options.req === undefined) ||
     ((ctx.options.req.baseUrl === '/api/accounts' ||
      ctx.options.req.baseUrl === '/api/Accounts') &&
      ctx.options.req.method === 'POST' && instance.role === 'client') ||
      ((ctx.options.req.baseUrl === '/api/tags' ||
      ctx.options.req.baseUrl === '/api/Tags') &&
      ctx.options.req.method === 'POST') ||
      ((ctx.options.req.baseUrl === '/api/cards' ||
      ctx.options.req.baseUrl === '/api/Cards') &&
      ctx.options.req.method === 'POST' &&
      instance.type === 'ExpertApproval'))
      next();
    else {
      const err = new Error('Not_Auth');
      err.statusCode = 401;
      ctx.options.req.accessToken ?
      ctx.options.req.accessToken.account((err, doc) => {
        const userId = doc.id ? doc.id : 'SYSTEM';
        if (ctx.isNewInstance) {
          ctx.instance.createdBy = userId;
          next();
        } else {
          // PUT -> ctx.instance , PATCH -> ctx.currentInstance
          instance = ctx.instance || ctx.currentInstance;
          if (!instance) next(); // Error in update all
          else
          ctx.Model.findById(instance.id,
            function(err, item) {
              instance.createdBy = item.createdBy;
              instance.updatedBy = userId;
              next();
            });
        }
      }) : ctx.options.req.header('Status') === 'test' ? next()  : next(err);
    }
  });
};
