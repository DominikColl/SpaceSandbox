import React, { useState, useEffect } from 'react';
import { Cartesian3, Color, Ion } from "cesium";
import { Viewer, Entity } from "resium";
import { getSatelliteInfo } from "tle.js";

const Cesium = () => {
    // Define a state variable 'count' and a function 'setCount' to update it
    const [satelliteData, setSatelliteData] = useState([]); // New state for storing fetched data
    Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3NzIxNTIxZC1lM2E5LTQyZTQtOGEwOC03ZjE1NDViNmFiNDciLCJpZCI6MTg3MTIyLCJpYXQiOjE3MDM5ODIxMzh9.P1yKWEbzauknpb7aT4z8Q8WcXv-hsBBWMAKE4yJ4bAA'

    useEffect(() => {

        const fetchData = async (satID) => {
            try {
                const response = await fetch(`https://tle.ivanstanojevic.me/api/tle/${satID}`);
                const data = await response.json();
                let tle = `${data.name}
                ${data.line1}
                ${data.line2}`
                const satelliteInfo = getSatelliteInfo(tle, new Date().getTime(), 0, 0, 0);
                setSatelliteData(prevData => [...prevData, satelliteInfo]);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };
        fetchData(25544);
    }, []);

    // https://tle.ivanstanojevic.me/api/tle/
    let sats = satelliteData.map((item) => {
        return <Entity
            name="ISS"
            position={Cartesian3.fromDegrees(item.lng, item.lat, 100)}
            point={{ pixelSize: 20, color: Color.WHITE }}
            description="International Space Station"
        />
    })

    return (
        <Viewer full>
            {sats}
        </Viewer>
    );
};

export default Cesium;