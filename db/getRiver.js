// const axios = require('axios');
// const fs = require('fs');

// const url = 'http://waterservices.usgs.gov/nwis/gwlevels?sites=375907091432201'
// const urlSC = 'http://waterservices.usgs.gov/nwis/gwlevels&format=json,1.2&stateCD=NY'
// const urlexp = 'https://waterservices.usgs.gov/nwis/iv/?format=json&stateCd=ak&parameterCd=00060,00065&siteType=ST&siteStatus=all'

// axios.get(urlexp)
//     .then(res => {
//         // console.log(res)
//         if(res.status == 200){
//             let jsonRivers = JSON.stringify(res.data)
//             console.log(jsonRivers)
//             fs.appendFile("./data.json", jsonRivers, err => {
//                 if(err){
//                     console.log(err)
//                 }else{
//                     console.log('file created!')
//                 }
//             })
//         }
//     })