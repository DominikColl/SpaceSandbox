import React, { useState, useEffect } from 'react';
import "./style.css";

const Menu = () => {
    const [sats, setSats] = useState([]);
    const [showStats, setShowSats] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://tle.ivanstanojevic.me/api/tle?page-size=100`);
                const data = await response.json();
                setSats(data.member);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };
        fetchData();
    }, []);

    const showOptions = () => {
        // console.log(sats);
    };

    const showSat = (e) => {
        console.log(e.target)
    }

    let data = sats.map((item) => {
        return <li onClick={showSat} key={item.satelliteId}>{item.name}</li>;
    });

    return (
        <div className="menu">
            <button onClick={showOptions}>Menu</button>
            <ul>
                {data}
            </ul>
        </div>
    );
};

export default Menu;
