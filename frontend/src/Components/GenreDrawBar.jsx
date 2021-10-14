import React, { useState, useEffect } from "react"
import styled from 'styled-components'


function GenreDrawBar(props) {
    const fullweek = props.fullweek;
    const week = props.week;
    const year = props.year;
    const countryCode = props.countryCode;
    const [color, setColor] = useState("#ffffff");

    useEffect(() => {
        if (year === 2020 && week < 33) {
            setColor('#ffffff')
        }else if (year === 2021 && week === 1 && countryCode != 'kr'){
            setColor('#ffffff')
        }else {
            fetch("/netflix/" + countryCode + "/" + fullweek + "/genre")
                .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                })
                .then((data) => {
                //console.log(data?.color);
                setColor(data?.color);
            });
        }
    }, [week]);

    const colors = [
        '#FFFF96','#FFE650','#FFE5CB','#FFCAD5','#FFB900','#FF9E9B','#FF88A7','#FF5675','#F0B469','#FF6666','#DDDDDD','#D27D32','#BECDFF','#ACF3FF','#AAEBAA','#A8F552','#9D71BD','#93DAFF','#78A9ED','#68D168','#65FFBA','#369F36','#14D3FF','#00BFFF','#CAB2DB'
        ]
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const confirmedCnt = props.confirmedCnt;
    const onClickAction = props.onClick;
    const ratio = props.ratio;

    return (
        <>
            <Bar confirmedCnt={confirmedCnt} ratio={ratio} onClick={onClickAction} color={color}></Bar>
        </>
    )
}

export default GenreDrawBar;

const Bar = styled.div`
    width: 12px;
    height: ${(props) => Math.round(props.confirmedCnt/props.ratio)/2}px;
    margin-top : ${(props) => 200 - Math.round(props.confirmedCnt/props.ratio)/2}px;
    background-color: ${(props) => props.color};
    cursor: pointer;
    border-radius: 60px 60px;

    &:hover {
        opacity: 0.7;
    }
`