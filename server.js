const fs = require('fs');
const path = require('path');
const express = require('express');

const db = ('.package.json');

const app = express();
const PORT = process.env.PORT || 3001; 

const uuid = require('uuid');
const { response } = require('express');
const dbId = uuid.v4;

// access public folder
app.use(express.static('/public'));

// middleware 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.get to requests 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dname, '/public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dname, '/public/notes.html'));
});

app.route('/api/notes')
// returning notes from db file as json
    .get((req, res, next) => {
        let data = fs.readFileSync(db);
        let dbJSON = JSON.parse(data);
        res.json(dbJSON);
})
    .post((req, res, next) => {
        const { title, text } = req.body;
        // if note has title and text, post to db
        let data = fs.readFileSync(db);
        console.log(data);
        let notes = JSON.parse(data);    
 
        if(title && text) {
            const noteText = {
                title,
                text,
                id: dbId,
            };
          
            // pushing notes into database
             notes.push(db);
          
            //  writing db file with new notes that are added
                fs.writeFile("db.json", JSON.stringify(notes), (err) => {
                    if(err) {
                        console.log(err);
                    } else {
                        console.log("Notes have been Saved!");
                }   
            });
            // response that note is save with note text 
            const resp = {
                status: "Note has been Saved!",
                body: noteText,
            };
            // response good code
            res.status(200).json(resp);
        } else {
            // response error code
            res.status(500).json("Note has not been saved!");    
        };
        res.json(noteText);  
    });

// talk to server
app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
  });
