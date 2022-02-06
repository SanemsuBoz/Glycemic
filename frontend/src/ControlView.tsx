import React from 'react';
import { Navigate } from 'react-router-dom';
import NavMenu from './components/NavMenu';


interface IControl {
    view: JSX.Element
}

export default function ControlView(props: IControl) {
    return (
        <>
            {<> <NavMenu /> {props.view} </>}
        </>
    )
}