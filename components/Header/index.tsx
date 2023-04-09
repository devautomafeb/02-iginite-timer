import React, { useContext } from 'react'
import { HeaderContainer } from "./styles";

import logoIginite from '../../assets/logoIginite.svg'
import { Timer, Scroll } from "phosphor-react";
import { NavLink } from "react-router-dom";

export function Header() {
    return (
        <HeaderContainer>
            <img src={logoIginite} alt="" />
            <nav>
                <NavLink to="" title="Timer">
                    <Timer size={24} />
                </NavLink>
                <NavLink to="/history" title="Histórico">
                    <Scroll size={24} />
                </NavLink>
            </nav>
        </HeaderContainer>
    )
}