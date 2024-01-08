import React, { useState, useEffect, useRef } from 'react';
import { Cartesian3, Color, Ion, PolylineDashMaterialProperty } from "cesium";
import { Viewer, Entity, PolylineGraphics, Clock } from "resium";
import { getSatelliteInfo, getGroundTracks } from "tle.js";

const Cesium = () => {
    const [satelliteData, setSatelliteData] = useState([]);
    const [satTrack, setSatTrack] = useState([]);
    const viewerRef = useRef(null); // Create a ref for the Viewer component

    Ion.defaultAccessToken = 'g0MDI2LCJpYXQiOjE3MDIzOTYwMDF9.0FHovmW8Ukr8E06h1HfSjyhvh1HMwdJLWkLkBH6IU1A';

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
                let res = await getGroundTracks({ tle: tle, startTimeMS: new Date().getTime(), stepMS: 1000, isLngLatFormat: false })
                let y = []
                let resZero = res[1]
                resZero.map(item => {
                    y.push(item[1])
                    y.push(item[0])
                    y.push(500000)
                })
                setSatTrack(y);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };
        fetchData(25544);
    }, []);

    let sats = satelliteData.map((item) => {
        return <Entity
            name="ISS"
            position={Cartesian3.fromDegrees(item.lng, item.lat, 100)}
            point={{ pixelSize: 20, color: Color.WHITE }}
            description="International Space Station"
        />
    });

    let tick = (e) => {
        // Log the Viewer component reference in the tick function
        console.log(viewerRef.current);
        //cesiumElement.entities._entities._array
        // Your other tick function logic here
    };

    return (
        <Viewer full ref={viewerRef}> {/* Attach the ref to the Viewer component */}
            {sats}
            <Entity
                name="PolylineGraphics"
                description="PolylineGraphics!!"
                position={Cartesian3.fromDegrees(satTrack[0])}>
                <PolylineGraphics
                    positions={Cartesian3.fromDegreesArrayHeights(satTrack)}
                    width={4}
                    material={
                        new PolylineDashMaterialProperty({
                            color: Color.CYAN,
                        })
                    }
                />
            </Entity>
            <Clock onTick={tick} />
        </Viewer>
    );
};

export default Cesium;
