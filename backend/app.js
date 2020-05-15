const express = require('express');
const app = express()
const fetch = require("node-fetch");

const PORT = 8080;
app.listen(PORT, function () {
    console.log('Server is ready at ' + PORT)
})

let contentUrl = 'https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&titles='
let data = ''
let allStates = [
    'Assam',
    'Bihar',
    'Delhi',
    'Goa',
    'Gujarat',
    'Haryana',
    'Jammu and Kashmir',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Chhattisgarh',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Uttar Pradesh',
    'West Bengal',
];
let clubs = []
async function fetchData() {
    const res = await fetch(contentUrl + 'List_of_football_clubs_in_India');
    res
        .json()
        .then(res => {
            data = res.query.pages['772674'].revisions[0]['*']
            data = data.split('===')
            allStates.map((state, j) => {
                i = data.indexOf(state);
                let each = data[i + 1].split(/\n+/);
                let stateClubs = new Object()
                stateClubs.state = state
                let c = []
                each.map((line) => {
                    if (line.indexOf('||') != -1) {
                        if (line.indexOf('|[[') == 0) {
                            let index = line.indexOf(']]')
                            let name = line.slice(3, index)
                            // console.log(name+j)
                            let list = { clubName: name, cnt: 0 }
                            c.push(list)
                        } else {
                            let index = line.indexOf('||');
                            let name = line.slice(1, index)
                            let list = { clubName: name, cnt: 0 }
                            c.push(list)
                        }
                    }
                })
                stateClubs.clubs = c
                clubs.push(stateClubs)
            })
            // console.log(clubs)
        })
        .catch(err => console.log(err));
}

fetchData()
app.use(express.json('1mb'))

app.get('/', function (req, res) {
    res.send(clubs)
})
app.post('/', function (req, res) {

    clubs = req.body
    console.log(clubs[0].clubs[0].cnt)

})
