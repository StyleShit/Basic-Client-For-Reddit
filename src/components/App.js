import React, { useState, useEffect, useRef } from 'react';
import { redditGet } from '../Utils/Utils';
import Sidebar from './Sidebar';
import Content from './Content';

import './css/App.css';

function App() 
{
	const postsContainer = useRef( null );
	const [ posts, setPosts ] = useState( [] );
	const [ listingData, setListingData ] = useState( {} );
	const [ isLoading, setIsLoading ] = useState( true );

	// lodd listing by name
	// set `next = true` to load next page of current listing
	function loadListing( listing, next = false )
	{
		setIsLoading( true );
		var params = next ? { after: listingData.after } : {};

		// reset posts array if it's a new listing, 
		// to avoid merging the current posts with the new ones
		if( !next )
			setPosts( [] );

		// fetch listing data
		redditGet( listing.toLowerCase(), params ).then( json => {
			
			// append new posts
			if( next )
				setPosts( prev => [ ...prev, ...json.data.children ]);
				
			// remove previous posts and put the new ones
			else
			{
				setPosts( json.data.children );
				postsContainer.current.scrollTop = 0;
			}

				
			setListingData({ listing, after: json.data.after });
			setIsLoading( false );

        });
	}

	// load next page for current listing
	function loadMore()
	{
		setIsLoading( true );
		loadListing( listingData.listing, true );
	}


	// load default listing on mount
	useEffect( () => {
		loadListing( 'Hot' ); 

		// eslint-disable-next-line
	}, []);

	return (
		<div className="reddit-client-container">
			
			<Sidebar loadListing={ loadListing } listingData={ listingData } />
			
			<Content listingData={ listingData } 
				posts={ posts } 
				loadMore={ loadMore } 
				postsContainer={ postsContainer } 
				isLoading={ isLoading } 
				loadListing={ loadListing } />			
				
		</div>
	);
}

export default App;
