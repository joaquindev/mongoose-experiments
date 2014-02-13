var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var utils = require('utils');


var setTags = function(tags){
  return tags.split(',');
}

var getTags = function(tags){
  return tags.join(',');
}

var ArticleSchema = new Schema({
  title: {type: String, default : '', trim: true}, 
  body: {type: String, defaul : '', trim: true}, 
  user: {type: Schema.ObjectId, ref: 'User'},
  comments: [{
    body: {type: String, default: ''}, 
    user: {type: Schema.ObjectId, ref:'User'}, 
    createdAt: {type: Date, default: Date.now}
  }], 
  tags: {type: [], get: getTags, set: setTags}, 
  image: {
    cdnUri: String, 
    files: []
  },
  createdAt: {type: Date, default: Date.now} 
});

//Validations
ArticleSchema.path('title').required(true, 'Article tittle cannot be blank');
ArticleSchema.path('body').required(true, 'Article body cannot be blank');

//Article Schema Methods
ArticleSchema.methods = {
  /** Save article and upload image
   * @param {Object} article
   * @param {function} cb
   * @api private
   */
  uploadAndSave: function (images, cb) {
    if (!images || !images.length) return this.save(cb)
    var imager = new Imager(imagerConfig, 'S3')
    var self = this
    this.validate(function (err) {
      if (err) return cb(err);
      imager.upload(images, function (err, cdnUri, files) {
        if (err) return cb(err)
        if (files.length) {
          self.image = { cdnUri : cdnUri, files : files }
        }
        self.save(cb)
      }, 'article')
    })
  },
  addComment: function(user, comment, cb){
    var notify = require('mailer'); 
    this.comments.push({
      body: comment.body, 
      user: user._id
    });
    if(!this.user.email) this.user.email = 'email@product.com'
    notify.comment({
      article: this, 
      currentUser: user, 
      comment: comment.body
    });
    this.save(cb);
  },
  removeComment: function(commentId, cb){
    var index = utils.indexof(this.comments, {id: commentId});
    if (~index) this.comments.splice(index,1);  
    else return cb('Not Found');
    this.save(cb);
  }
};

//Article Statics
ArticleSchema.statics = {
  /**
   * Find article by ID
   * @param {ObjectId} id
   * @param {Function} cb
   * @api private
  */
   load: function(id, cb){
    this.findOne({_id: id}).
        populate('user', 'name email username').
        populate('comments.user').
        exec(cb)
    },

   /**
   * List articles
   * @param {ObjectId} options
   * @param {Function} cb
   * @api private
  */
   list: function(options, cb){
        var criteria = options.criteria || {}
        this.find(criteria).
            populate('user', 'name username').
            sort({'createdAt': -1}).
            limit(options.perPage).
            skip(options.perPage * options.page).
            exec(cb)
    }
};
mongoose.model('Article', ArticleSchema);
