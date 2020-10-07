import React from 'react';

export default function Sidebar({ loadListing })
{
    return (
        <div className="sidebar">
            <span onClick={ () => { loadListing( 'hot' ) }}>hot</span>
            <span onClick={ () => { loadListing( 'new' ) }}>new</span>
            <span onClick={ () => { loadListing( 'rising' ) }}>rising</span>
            <span onClick={ () => { loadListing( 'controversial' ) }}>controversial</span>
        </div>
    )
}