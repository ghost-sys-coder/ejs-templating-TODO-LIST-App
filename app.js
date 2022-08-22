const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

const date = require(__dirname +'/date.js');

const app = express();
const items = ['Go to the Gym', 'Finish up with your E-commerce Project', 'Master NodeJS with Daily Tuition'];
const workItems = ['Attend a meeting...'];
const nameItems = ['Tamale Frank', 'Mukabeera Olivia', 'Allan Mark Ssali'];

app.use(bodyParser.urlencoded(
    {extended: true}
));

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => {

   let day = date.getDate();

    res.render('list', {listTitle : day, newListItems : items})
});

app.post('/', (req, res) => {
    let item = req.body.newItem;
    console.log(req.body)
    if (req.body.list === 'Work') {
        workItems.push(item);
        res.redirect('/work');
    } else if (req.body.list === 'Names') {
        nameItems.push(item);
        res.redirect('/names');
    }
    else {
        items.push(item);
        res.redirect('/');
    }
  
   
})

app.get('/work', (req, res) => {
    res.render('list', {listTitle: 'Work List', newListItems: workItems})
})

app.post('/work', (req, res) => {
    let item = req.body.newItem;
    workItems.push(item);

    res.redirect('/work');
})

app.get('/names', (req, res) => {
    res.render('list.ejs', { listTitle: "Names List", newListItems: nameItems })
});

app.post('/names', (req, res) => {
    let item = req.body.newItem;
    console.log(req.body)
    nameItems.push(item);

    res.redirect('/names');
})

app.get('/about', (req, res) => {
    res.render('about');
})

app.listen(port, () => {
    console.log(`The server is running on port: ${port}`);
})