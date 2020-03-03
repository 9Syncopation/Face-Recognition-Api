
const Clarifai = require('clarifai');

//API key from Clarifai
const app = new Clarifai.App({
    apiKey: "279fa7ebdceb4e7ca6a94e313cee1a3e"
  });
  const handleApiCall = (req, res) => {
      app.models
      .predict( Clarifai.FACE_DETECT_MODEL, req.body.input)
      .then(data => {
          res.json(data)
      })
      .catch(err => {
          console.log('api error',err);
         res.status(400).json('unable to work with API')
         
      } ) 
  }

const handleImage = (req, res, db) => {
        const { id } = req.body 
        db('users').where('id','=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries =>{
            res.json(entries[0])        
        })
        .catch(err => res.status(400).json('unable to get entries'))
    
        // let found = false
        // database.users.forEach(user => {
        //     if(user.id === id){
        //         found = true
        //         user.entries++
        //         console.log('user entries', user.entries);
        //         console.log('json user entries',res.json(user.entries));
        //         return res.json(user.entries)            
        //     }
        // })
        //     if(!found){
        //         res.status(404).json('not found')
        //     }
}

module.exports = {
    handleImage,
    handleApiCall
}
