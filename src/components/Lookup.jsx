import {useState, useEffect, useRef} from 'react';
import ApexCharts from 'apexcharts'
import Chart from 'react-apexcharts';
import Search from './Search/'
function Lookup({accessToken, analyze}) {

    const [queryData, setQueryData] = useState()
    const [features, setFeatures] = useState()
    const [analysis, setAnalysis] = useState()
    const [track, setTrack] = useState()
    const [artist, setArtist] = useState()

    function analyze(id, track, artist) {
        console.log(`Analyzing ${track} by ${artist}...`)
        fetch(`https://api.spotify.com/v1/audio-features/${id}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(response => response.json())
        .then((data) => {
            // console.log("FEATURES in lookup", data, track)
            getAnalysis(data.analysis_url)
            setFeatures(data)
            setTrack(track)
            setArtist(artist)
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

    function radarChart() {
        const options = {
            chart: {
                id: 'radar chart'
            },
            yaxis: {
                show: false,
                max: 1
            }, 
            labels: [
                "more danceable",
                "more sad",

                "less loud",
                "less energetic",
                
                "less danceable",
                "more happy", // (happy/sad)

                "more loud",
                "more energetic"
            ]
        }

        const series = [
            {
                data: [
                features.danceability.toFixed(2), 
                1 - features.valence.toFixed(2),

                ((features.loudness * - 1) / 60).toFixed(2),
                1 - features.energy.toFixed(2),

                1 - features.danceability.toFixed(2),
                features.valence.toFixed(2),

                1 - ((features.loudness * - 1) / 60).toFixed(2),
                features.energy.toFixed(2), 

            ]
        }
        ]
        return(
            <Chart 
                options={options}
                series={series}
                type="radar"
                width="500"
            />
        )
    }

    function barChart() {

    }

    function lineChart() {
        // measure the loudness and tempo along a libe chart for the length of the song
        let _sections = []
        let _sectionsTime = []
        let _tempo = []
        analysis.sections.forEach(section => {
            let normalLoudness = 1 - ((section.loudness * -1) / 60).toFixed(2)

            _sections.push(normalLoudness)
            _sectionsTime.push(section.start)
            _tempo.push(section.tempo)
        })

        _sectionsTime.push(analysis.sections[analysis.sections.length - 1].start + analysis.sections[analysis.sections.length - 1].duration)

        let last = analysis.sections.length
        let finalSection = 1 - ((analysis.sections[last - 1].loudness * -1) / 60).toFixed(2)
        // get the last point
        _sections.push(finalSection)

        const options = {
            chart: {
                id: 'line chart'
            },
            yaxis: {
                title: {
                    text: "% Max Loudness",
                    style: {
                        color: 'white'
                    }
                },
                min: 0,
                max: 1,
                tickAmount: 6,
                labels: {
                    style: {
                        colors: 'white', // Change this to your desired color
                    },
                    formatter: function (value) {
                        return value.toFixed(1); // Customize the Y-axis label format
                    }

                },
            },
            xaxis: {
                title: {
                    text: "Sections in Track (in seconds)",
                    style: {
                        color: "white"
                    }
                },
                labels: {
                    style: {
                        colors: 'white'
                    },
                    formatter: function(value) {
                        return Math.round(value)+ 's'
                    }
                },
                categories: [
                    ..._sectionsTime,
                ],
                show: true,
       
            },
            // labels: [
            //     'loudness'
            // ]
        }

        const series = [
            {
                data: [..._sections],
                // data2: [..._tempo]
        }]
        return(
            <Chart 
                options={options}
                series={series}
                type="line"
                width="500"
            />
        )
    }
    function handleCopy(id) {
        // console.log("Copied!", id)
        navigator.clipboard.writeText(id)
    }

    useEffect(() => {
        if(features && analysis) {
            lineChart()
        }
    }, [features, analysis])
    return(
        <main className="content flex-row">
            <Search 
                accessToken={accessToken} 
                analyze={analyze}
                setQueryData={setQueryData}
            />
            <section className="primary">
                {track ? 
                    <section className="primary__track-details">
                        <p><span style={{"fontWeight": "bold"}}>track</span> {track}</p>
                        <p><span style={{"fontWeight": "bold"}}>artist</span> {artist}</p>
                        <p onClick={() => handleCopy(features.id)} style={{"cursor": "pointer"}}><span style={{"fontWeight": "bold"}}>id</span> {features.id}</p>
                    </section>
                    :<p>No track</p>}
                {features && analysis ? 
                    <div className="flex-row gap-small">
                        {radarChart()}
                        {lineChart()}
                        {/* <Chart 
                            options={
                                {chart: {
                                    id: "basic-bar", 

                                }, 
                                xaxis: {
                                    categories: ['danceability','energy','instrumentalness','liveness','speechiness'],
                                    labels: {
                                        style: {
                                        colors: ['white', 'white', 'white', 'white', 'white'] // Change the colors as needed
                                        }
                                    }
                                },
                                yaxis: {
                                    max: 1, // Set the maximum height for the y-axis
                                    title: {
                                    text: 'Values'
                                    },
                                    labels: {
                                        style: {
                                            colors: ['white']
                                        },
                                        formatter: function (value) {
                                            return value.toFixed(2); // Round to two decimal places
                                        }
                                    }
                                },
                            }
                            }
                            series={
                                [{
                                name: 'track features',
                                data: [
                                    features.danceability, 
                                    features.energy, 
                                    features.instrumentalness, 
                                    features.liveness, 
                                    features.speechiness
                                ]
                            }]
                            }
                            type="bar"
                            width="500"
                        />  */}
                    </div>
                :null}
            </section>
        </main>


    )
}

export default Lookup


// Bar
    // <Chart 
    // options={
    //     {chart: {
    //         id: "basic-bar", 

    //     }, 
    //     xaxis: {
    //         categories: ['danceability','energy','instrumentalness','liveness','speechiness'],
    //         labels: {
    //             style: {
    //             colors: ['white', 'white', 'white', 'white', 'white'] // Change the colors as needed
    //             }
    //         }
    //     },
    //     yaxis: {
    //         max: 1, // Set the maximum height for the y-axis
    //         title: {
    //         text: 'Values'
    //         },
    //         labels: {
    //             style: {
    //                 colors: ['white']
    //             },
    //             formatter: function (value) {
    //                 return value.toFixed(2); // Round to two decimal places
    //             }
    //         }
    //     },
    // }
    // }
    // series={
    //     [{
    //     name: 'track features',
    //     data: [
    //         features.danceability, 
    //         features.energy, 
    //         features.instrumentalness, 
    //         features.liveness, 
    //         features.speechiness
    //     ]
    // }]
    // }
    // type="bar"
    // width="750"
    // /> 


// radar

