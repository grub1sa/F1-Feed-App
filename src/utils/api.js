export const fetchAllDrivers = (year) => {
    return fetch(`http://ergast.com/api/f1/${year}/driverStandings.json `)
        .then(res => res.json())
}
export const fetchDriverDetail = (id, year) => {
    return fetch(`https://ergast.com/api/f1/${year}/drivers/${id}/driverStandings.json`)
        .then(res => res.json())
}
export const fetchDriverRaces = (id, year) => {
    return fetch(`http://ergast.com/api/f1/${year}/drivers/${id}/results.json `)
        .then(res => res.json())
}
export const fetchDriverImage = (driverName) => {
    return fetch(`https://en.wikipedia.org/w/api.php?action=query&titles=${driverName}&prop=pageimages&formatversion=2&origin=*&format=json&pithumbsize=100 `)
        .then(res => res.json())
}

export const fetchAllTeams = (year) => {
    return fetch(`http://ergast.com/api/f1/${year}/constructorStandings.json`)
        .then(res => res.json())
}

export const fetchTeamDetails = (year,id) => {
    return fetch(`http://ergast.com/api/f1/${year}/constructors/${id}/constructorStandings.json `)
        .then(res => res.json())
}

export const fetchTeamResults = (year,id) => {
    return fetch(`http://ergast.com/api/f1/${year}/constructors/${id}/results.json`)
        .then(res => res.json())
}

export const fetchAllRaces = (year) => {
    return fetch('http://ergast.com/api/f1/' + year + '/results/1.json')
        .then(res => res.json())
}
export const fetchQualifiers = (year,id) => {
    return fetch('http://ergast.com/api/f1/' + year + '/' + id + '/qualifying.json' )
        .then(res => res.json())
}
export const fetchResults = (year,id) => {
    return fetch('http://ergast.com/api/f1/' + year + '/' + id + '/results.json')
        .then(res => res.json())
}

export const fetchDriverData = (id, year, driverName) => {
    return Promise.all([
        fetchDriverDetail(id, year),
        fetchDriverRaces(id, year),
        fetchDriverImage(driverName)
        
        
    ])
}

export const fetchTeamData = (id, year) => {
    return Promise.all([
        fetchTeamDetails(year,id),
        fetchTeamResults(year,id),
        fetchDriverImage(id)//slika tima
        
    ])
}

export const fetchRacesData = (id, year) => {
    return Promise.all([
        fetchResults(year,id),
        fetchQualifiers(year,id)
        
        
    ])
}