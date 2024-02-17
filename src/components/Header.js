import React from 'react';

function Header(props) {
    return (
        <div className="header-component" onClick={() => window.scroll(0, 0)}>
            <img src="/assets/images/clapper.png" alt=""/>
            Movie hub
            <img src="/assets/images/camera.png" alt=""/>
        </div>
    );
}

export default Header;