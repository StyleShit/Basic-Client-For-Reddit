import React from 'react';

export default function Sidebar({ loadListing, listingData })
{
    function getClassName( listing )
	{
        if( listingData.listing && listing === listingData.listing )
            return 'active';

        return '';
    }

    function onClick( e )
    {
        loadListing( e.target.dataset.listing );        
    }

    const listings = [ 
        { name: 'hot',  icon: 'lab la-hotjar' },
        { name: 'new',  icon: 'las la-plus-circle' },
        { name: 'rising',  icon: 'las la-chart-area' },
        { name: 'controversial', icon: 'las la-bolt' },
        { name: 'top', icon: 'las la-trophy' }
    ];
    
    return (
        <div className="sidebar">

            <img className="reddit-logo" alt="reddit-logo" src="img/reddit-logo.svg" />

            <ul>
                {
                    listings.map(( { name, icon }, i ) => (
                        <li key={ i } className={ getClassName( name ) } data-listing={ name } onClick={ onClick }>
                            <i className={ icon }></i> { name }
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}