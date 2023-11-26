import {useState, useEffect, useRef} from 'react';

function Search({accessToken, analyze, setQueryData}) {


    const delay = useRef()
    const queryString = useRef()
    const [trackResults, setTrackResults] = useState()
    const [artistResults, setArtistResults] = useState()

    function resetSearch() {
        setTrackResults()
        setArtistResults()

        const input = document.getElementsByTagName('input')[0]
        input.value = ''
        input.placeholder="Enter artist or track name"
    }

    function search(query) {

        fetch(`https://api.spotify.com/v1/search?query=$${query}&type=artist,track`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }).then((response) => response.json())
        .then((data) => {
            setTrackResults(data.tracks)
            setArtistResults(data.artists)
        })
    }

    function handleSearch() {
        if(queryString.current === '') {
            if(delay.current) {
                clearTimeout(delay.current)
            }
            setTrackResults()
            setArtistResults()
            return false
        }

        if(delay.current) {
            clearTimeout(delay.current) 
        }

        delay.current = setTimeout(() => search(queryString.current), 500)
    }

    function handleChange(e) {
        e.stopPropagation()
        queryString.current = e.target.value
        handleSearch(queryString.current)
    }

    useEffect(() => {

    }, [trackResults, artistResults])

    useEffect(() => {

    }, [])

    return(
        <aside className="search">
            <input type="text" placeholder="Enter artist or track name" onChange={handleChange} className="search__input" />
            {trackResults && artistResults ?
                <SearchResult 
                    artists={artistResults.items}
                    tracks={trackResults.items}
                    analyze={analyze}
                    resetSearch={resetSearch}
                />
                :<span></span>
            }
        </aside>
    )
}


function SearchResult({artists, tracks, label, id, analyze, resetSearch}) {
    const [trackDisplay, setTrackDisplay] = useState(true) // so this was here to display tracks by default
    const [artistDisplay, setArtistDisplay] = useState(false)
    const [seed, setSeed] = useState([label, id])
    const [current, setCurrent] = useState('')

    function handleButtonClick(queryType) {
        if(queryType === 'artists') {
            setTrackDisplay(false)
            setArtistDisplay(true)
        } else if(queryType === 'track') {
            setTrackDisplay(true)
            setArtistDisplay(false)
        }
    }

    useEffect(() => {

    }, [])

    useEffect(() => {

    }, [artists, tracks])

    return(
        <div className="search__results">
            <div className="search__results__buttons">
                <button className="search__results__btn" onClick={() => handleButtonClick('track')}>Tracks</button>
                <button className="search__results__btn" onClick={() => handleButtonClick('artists')}>Artists</button>
            </div>
            {trackDisplay ? 
                    <div className={`search__results--tracks`}>
                        {tracks.map((track) => {
                            return <SearchResultRow 
                                key={track.id}
                                label={'track'}
                                id={track.id}
                                name={track.name}
                                artist={track.artists[0].name}
                                uri={track.uri}
                                analyze={analyze}
                                resetSearch={resetSearch}
                            />
                        })}
                    </div>
            :            
                <div className={`search__results--tracks ${current}`}>
                {artists.map((artist) => {
                    return <SearchResultRow 
                        key={artist.id}
                        label={'artist'}
                        id={artist.id}
                        name={artist.name}
                        analyze={analyze}
                        resetSearch={resetSearch}
                    />
                })}
                </div>
            }

        </div>
    )
}

function SearchResultRow({label, id, name, uri, artist, analyze, resetSearch}) {

    const [active, setActive] = useState(false)
    // const [seed, setSeed] = useState([label, id])
    const [current, setCurrent] = useState('')

    function handleClick() {

        // console.log(name, artist, id, analyze)
        analyze(id, name, artist)
        resetSearch()
        
        // () => {navigator.clipboard.writeText(id)}
    }


    useEffect(() => {

        if(active === true) {
            setCurrent('results-active')
        } else if(active === false) {
            setCurrent('')
        }
    }, [active])

    useEffect(() => {
        setActive(false) // this resets style, however
    }, [id, name])

    return(
        <div className={`search__results__row ${current}`} onClick={handleClick}>
            {artist !== undefined ? 
               <div className="search__results__row__track">
                <p name="track-name" className="search__results__row__main">{name}</p>
                <p name="artist-name" className="search__results__row__sub">{artist}</p>
                {/* <div style={{"display": "flex", "gap": "10px"}}>
                    <p name="result-id" className="search__results__row__sub" >{id}</p>
                    <p className="search__results__row__sub">{uri}</p>
                </div> */}
 
               </div> 
            :<p className="search__results__row__main">{name}</p>
            }
        </div>
    )
}
export default Search