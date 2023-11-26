import {useState, useEffect} from 'react';

function Analysis({accessToken, features, analysis, trackName, artistName}) {

    // const [features, setFeatures] = useState()
    // const [analysis, setAnalysis] = useState()
    // function handleClick() {
    //     analyze()
    // }

    // function analyze() {
    //     const toAnalyze = document.getElementsByName('analysis-input')[0].value
    //     console.log("Analyzing.....", toAnalyze)

    //     fetch(`https://api.spotify.com/v1/audio-features/${toAnalyze}`, {
    //         headers: {
    //             'Authorization': `Bearer ${accessToken}`
    //         }
    //     }).then(response => response.json())
    //     .then((data) => {
    //         console.log("FEATURES", data)
    //         getAnalysis(data.analysis_url)
    //         setFeatures(data)
    //     })
    // }

    // function getAnalysis(url) {
    //     fetch(url, {
    //         headers: {
    //             'Authorization': `Bearer ${accessToken}`
    //         }
    //     }).then(response => response.json())
    //     .then((data) => {
    //         console.log("ANALYSIS", data)
    //         setAnalysis(data)
    //     })
    // }

    useEffect(() => {
        if(analysis && features) {
            console.log("FEATURES", features)
            console.log("ANALYSIS", analysis)
        }
    }, [])


    return(
        <div className="analysis">
            <h1>Analysis</h1>
            {/* <div className="analysis__form">
                <input name="analysis-input" type="text" placeholder="Enter a spotify ID" className="search__input"/>
                <button onClick={handleClick}>Analyze</button>
            </div> */}

            {analysis && features ? 
                <>
                    <p>Analysis Complete for {trackName} by {artistName}</p> 
                    <div className="analysis-features">
                        <p>Features</p>
                        <div className="analysis__output">
                            {/* <h3>Features</h3> */}
                            <div className="analysis__graph__container">

                            </div>
                            <div className="analysis__graph__legend">
                                <div className="flex-column center-text">
                                    <p>{features.acousticness}</p>
                                    <p>Acousticness</p>
                                </div>
                                <div className="flex-column center-text">
                                    <p>{features.danceability}</p>
                                    <p>Danceability</p>
                                </div>
                                <div className="flex-column center-text">
                                    <p>{features.instrumentalness}</p>
                                    <p>Instrumentalness</p>
                                </div>
                                <div className="flex-column center-text">
                                    <p>{features.liveness}</p>
                                    <p>Liveliness</p>
                                </div>
                                <div className="flex-column center-text">
                                    <p>{features.loudness}</p>
                                    <p>Loudness</p>
                                </div>
                                <div className="flex-column center-text">
                                    <p>{features.speechiness}</p>
                                    <p>Speechiness</p>
                                </div>
                                <div className="flex-column center-text">
                                    <p>{features.tempo}</p>
                                    <p>Tempo</p>
                                </div>
                                <div className="flex-column center-text">
                                    <p>{features.mode}</p>
                                    <p>Mode</p>
                                </div>
                                <div className="flex-column center-text">
                                    <p>{features.time_signature}</p>
                                    <p>Time Signature</p>
                                </div>
                            </div>
                            

                        </div>
                        <div className="analysis__output">
                            <h3>Analysis</h3>
                            {/* <p>{analysis.meta}</p> */}
                        </div>
                    </div>
                </>
                : null}
        </div>
    )
}

function Graph({data}) {

    return(
        <div className="graph">

        </div>
    )
}

function Bars({value}) {

    return(
        <div className="graph__bar">

        </div>
    )
}
export default Analysis;

/**
 * 
 * 
 * 
 * TOM SAWYER
 * {
    "danceability": 0.536,
    "energy": 0.901,
    "key": 9,
    "loudness": -7.211,
    "mode": 1,
    "speechiness": 0.0374,
    "acousticness": 0.00145,
    "instrumentalness": 0.0186,
    "liveness": 0.06,
    "valence": 0.666,
    "tempo": 87.559,
    "type": "audio_features",
    "id": "3QZ7uX97s82HFYSmQUAN1D",
    "uri": "spotify:track:3QZ7uX97s82HFYSmQUAN1D",
    "track_href": "https://api.spotify.com/v1/tracks/3QZ7uX97s82HFYSmQUAN1D",
    "analysis_url": "https://api.spotify.com/v1/audio-analysis/3QZ7uX97s82HFYSmQUAN1D",
    "duration_ms": 276880,
    "time_signature": 4
}

XANADU
{
    "danceability": 0.316,
    "energy": 0.529,
    "key": 5,
    "loudness": -9.067,
    "mode": 0,
    "speechiness": 0.0516,
    "acousticness": 0.127,
    "instrumentalness": 0.00229,
    "liveness": 0.0923,
    "valence": 0.0456,
    "tempo": 140.785,
    "type": "audio_features",
    "id": "5q7KiSN7znIONR76LAqm7k",
    "uri": "spotify:track:5q7KiSN7znIONR76LAqm7k",
    "track_href": "https://api.spotify.com/v1/tracks/5q7KiSN7znIONR76LAqm7k",
    "analysis_url": "https://api.spotify.com/v1/audio-analysis/5q7KiSN7znIONR76LAqm7k",
    "duration_ms": 664853,
    "time_signature": 4
}
 */