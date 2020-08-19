// discussion controllers
const request = require('request'); 
const getDiscussion = require('./controller').getDiscussion;
const createDiscussion = require('./controller').createDiscussion;
const toggleFavorite = require('./controller').toggleFavorite;
const deleteDiscussion = require('./controller').deleteDiscussion;

/**
 * discussion apis
 */
const discussionAPI = (app) => {
  // get signle discussion
  app.get('/api/discussion/:discussion_slug', (req, res) => {
    const { discussion_slug } = req.params;
    getDiscussion(discussion_slug).then(
      (result) => { res.send(result); },
      (error) => { res.send(error); }
    );
  });

  // toggle favorite to the discussion
  app.put('/api/discussion/toggleFavorite/:discussion_id', (req, res) => {
    const { discussion_id } = req.params;
    if (req.user) {
      // TODO: describe the toggle process with comments
      toggleFavorite(discussion_id, req.user._id).then(
        (result) => {
          getDiscussion(result.discussion_slug).then(
            (result) => { res.send(result); },
            (error) => { res.send({ discussionUpdated: false }); }
          );
        },
        (error) => { res.send({ discussionUpdated: false }); }
      );
    } else {
      res.send({ discussionUpdated: false });
    }
  });

  // create a new discussion
  app.post('/api/discussion/newDiscussion', (req, res) => {
    if (req.user) {
      createDiscussion(req.body).then(
        (result) => { 
        
          var json_content = JSON.parse(req.body.content);
          console.log(json_content);

          var userId = req.body.userId.charAt(0);
          var title = req.body.title;
          var json_content = JSON.parse(req.body.content);
          var json_text = JSON.parse(json_content.blocks[0].text);
          var status = json_text.status;
          var score = json_text.score;

          //var json_text = JSON.parse(json_content.text);
          console.log(json_text.status);
          var tag = req.body.tags[0];

          var userstring = userId+'/'+title+'/'+status+'/'+score+'/'+tag
          var url = "http://repository:3000/"+userstring;
          
          console.log(url);
 
        request(url, function(err,response,body){
            if (!err && response.statusCode == 200)
              console.log('success');
            else 
                console.log(err);
        });


          

          res.send(Object.assign({}, result._doc, { postCreated: true })); 
          console.log("createDiscussion");
        },
        (error) => { res.send({ postCreated: false }); }
      );
    } else {
      res.send({ postCreated: false });
    }
  });

  // delete a discussion
  app.delete('/api/discussion/deleteDiscussion/:discussion_slug', (req, res) => {
    if (req.user) {
      deleteDiscussion(req.params.discussion_slug).then(
        (result) => { res.send({ deleted: true }); },
        (error) => { res.send({ deleted: false }); }
      );
    } else {
      res.send({ deleted: false });
    }
  });
};

module.exports = discussionAPI;
