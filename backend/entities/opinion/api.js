// controllers
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
          var json_text = JSON.parse(req.body.content);
          console.log(json_text);
          var branch_name='';
          var branch_creator='';
          var branch_rid='';
          var branch_pid='';
          var branch_message='';
        /*  var userId = req.body.userId.charAt(0);
          var title = req.body.title;
          var json_content = JSON.parse(req.body.content);
          var json_text = JSON.parse(json_content.blocks[0].text);
          var status = json_text.status;
          var score = json_text.score;

          //var json_text = JSON.parse(json_content.text);
          console.log(json_text.status);
          var tag = req.body.tags[0];

          var userstring = userId+'/'+title+'/'+status+'/'+score+'/'+tag
          var url = "http://101.101.217.23:3000/"+userstring;
          
          console.log(url);
 
        request(url, function(err,response,body){
            if (!err && response.statusCode == 200)
              console.log('success');
            else 
                console.log(err);
        }); */




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
