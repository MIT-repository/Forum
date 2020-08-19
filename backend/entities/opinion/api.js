// controllers
const request = require('request'); 
const getAllOpinions = require('./controller').getAllOpinions;
const createOpinion = require('./controller').createOpinion;
const deleteOpinion = require('./controller').deleteOpinion;

/**
 * opinion apis
 */
const opinionAPI = (app) => {
  // create an opinion
  app.post('/api/opinion/newOpinion', (req, res) => {
    if(req.user) {
      createOpinion(req.body).then(
        (result) => { 
          console.log(req.body);
          var json_data = JSON.parse(req.body.content);
          var json_text = JSON.parse(json_data.blocks[0].text);
          console.log(json_text);
          var branch_name=json_text.branch_name
          var branch_creator=req.body.user_id.charAt(0);
          var branch_rid=req.body.discussion_id.charAt(0);
          var branch_pid=json_text.parent_bid;
          var branch_message=json_text.message;

          var userstring = branch_name+'/'+branch_creator+'/'+branch_rid+'/'+branch_pid+'/'+branch_message;
          console.log(userstring);

          var url = "http://repository:3000/"+userstring;
          
          console.log(url);
 
          request(url, function(err,response,body){
              if (!err && response.statusCode == 200)
              {
                console.log('success');
              }
              else 
                  console.log(err);
          }); 
          
          res.send(result); 
        },
        (error) => { res.send(error); }
      );

    } else {
      res.send({ authenticated: false });
    }
  });



  // remove an opinion
  app.delete('/api/opinion/deleteOpinion/:opinion_id', (req, res) => {
    if(req.user) {
      deleteOpinion(req.params.opinion_id).then(
        (result) => { res.send({ deleted: true }); },
        (error) => { res.send({ deleted: false }); }
      );
    }
  });
};

module.exports = opinionAPI;
