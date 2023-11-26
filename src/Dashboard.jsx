import {useState, useEffect} from 'react';
import useAuth from './hooks/useAuth';

import Search from './components/Search'
import Analysis from './components/Analysis';
import Lookup from './components/Lookup';
import Navbar from './components/Navbar';

function Dashboard({code}) {

    const accessToken = useAuth(code)
    const [currentView, setCurrentView] = useState('lookup')
    const [features, setFeatures] = useState()
    const [analysis, setAnalysis] = useState()
    const [trackName, setTrackName] = useState()
    const [artistName, setArtistName] = useState()

    function displayView(view) {
        if(view === 'lookup') {
            return(
                <Lookup 
                    accessToken={accessToken}
                    analyze={analyze}
                />
            )
        } 
    }

    function analyze(id, track, artist) {
        console.log(`Analyzing ${track} by ${artist}...`)
        fetch(`https://api.spotify.com/v1/audio-features/${id}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(response => response.json())
        .then((data) => {
            console.log("FEATURES", data)
            getAnalysis(data.analysis_url)
            setFeatures(data)
            setTrackName(track)
            setArtistName(artist)
        })
    }

    function getAnalysis(url) {
        fetch(url, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(response => response.json())
        .then((data) => {
            console.log("ANALYSIS", data)
            setAnalysis(data)
        })
    }

    useEffect(() => {
        if(accessToken) {
            console.log("Logged in")
        }
    }, [accessToken])

    return(
        <div className="dashboard">
            <Navbar />
            {accessToken ? displayView(currentView):<h1>Loading...</h1>}
        </div>
    )
}

export default Dashboard