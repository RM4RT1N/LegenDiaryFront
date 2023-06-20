import React from 'react'
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import App from './App'
import NotFound from './NotFound'
import AddLegend from './AddLegend'
import MapFilter from './MapFilter'
import MapFilterWord from './MapFilterWord'
import RadioBrowserAPI from './RadioAPI'
import UserPanel from './UserPanel'
import UP from './UP'
import Edit from './Edit'
import OpenStreetMap from './OSM'

 
const RouterReact = () =>(
    
    <Router>
        <Routes>
            <Route path='/' element={<App />}/>
            <Route path='/search' element={<MapFilter />}/>
            <Route path='/searchword' element={<MapFilterWord />}/>
            <Route path='/add' element={<AddLegend />}/>
            <Route path='radio' element={<RadioBrowserAPI />}/>
            <Route path='*' element={<NotFound />}/>
            <Route path='/user' 
                element={<UserPanel avatarUrl={'https://i.redd.it/bk6dm7terlk51.jpg'}
                                    username={"Blahaj"}
                                    email={"SirBlahaj@gmail.com"}/>}/>
            <Route path="/edit/:id" element={<Edit />} />
            <Route path='/user2' 
                element={<UP avatarUrl={'https://i.redd.it/bk6dm7terlk51.jpg'}
                                    username={"Blahaj"}
                                    email={"SirBlahaj@gmail.com"}/>}/>
            <Route path='/testmap' element={<OpenStreetMap />} />
        </Routes>
    </Router>
    )
    
    export default RouterReact