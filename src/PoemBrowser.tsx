import React from "react";
import './poembrowser.css'
import cswm from './images/img.png'
import cswmflip from './images/flipimg.png'
import tressan from './images/tressan_tanar.jpg'
import mch from './images/charybdis.png'
import mch2 from './images/mch2.jpg'
import uv1 from './images/julcsa.jpg'
import uv2 from './images/whispercarlo.jpg'
import zephyr from './images/zepyr.jpg'
import {NavLink} from "react-router-dom";
import {allPoems} from "./poem";

interface CategoryProp {
    link:string;
    title:string;
    description:string;
    img:string
}

function Category(props: CategoryProp) {
    return (
        <NavLink to={props.link}>
            <div className={"category-container"}>
                <div className={"category"}>
                    <div className={"p-6"}>
                        <h1 className={"font-bold"}>{props.title}</h1>
                        <p>{props.description}</p>
                    </div>
                    <img src={props.img} alt={"mch"}/>
                </div>
            </div>
        </NavLink>
    )
}

export default class EveryPoem extends React.Component {
    render() {
        return <div className={"bg-gradient-to-br from-indigo-500 via-purple-500 via-35% to-pink-500"} style={{color:'white'}}>
            <h1 className={"text-7xl font-bold"}>Versek</h1>

            <div className={"flex flex-wrap p-8 justify-center gap-16"}>
                <Category link={"/best"} title={"CsWM Best Of"} description={"A CsWM művek legjobbjai, csak neked, csak most. Válogatott CsWM versek."} img={cswm}/>
                <Category link={"/worst"} title={"CsWM Worst Of"} description={"A CsWM művek legfosabbjai, csak neked, csak most. Válogatott CsWM versek."} img={cswmflip}/>
                <Category link={"/poems"} title={"Összes CsWM Vers"} description={"Új CsWM album olyan sikerművekkel mint a Bistey Homeo, Reformkor a Pincémben, és sok más. Hamarosan a mozikban"} img={uv1}/>
                <Category link={"/poemroute"} title={"CsWM Vers kereső"} description={"CsWM versek cím alapján"} img={uv2}/>
                <Category link={"/mch1"} title={"Magna Charybdis I"} description={"Nagy Charybdis kalandjai"} img={mch}/>
                <Category link={"/mch2"} title={"Magna Charybdis II"} description={"Nagy Charybdis kalandjai, immár Schibzi társaságában"} img={mch2}/>
                <Category link={"/tressan"} title={"Treßan"} description={"Treßan háttértörténete"} img={tressan}/>
                <Category link={`/poem/${allPoems[Math.floor(Math.random()*allPoems.length)].title}`} title={"Random Vers"} description={""} img={zephyr}/>
            </div>
        </div>;
    }
}
