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
        loadListing({ listing: e.target.dataset.listing });
    }

    const listings = [ 
        { name: 'Hot',  icon: 'lab la-hotjar' },
        { name: 'New',  icon: 'las la-plus-circle' },
        { name: 'Rising',  icon: 'las la-chart-area' },
        { name: 'Controversial', icon: 'las la-bolt' },
        { name: 'Top', icon: 'las la-trophy' }
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