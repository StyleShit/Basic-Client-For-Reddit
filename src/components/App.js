import React, { useState } from 'react';
import { redditGet } from '../Utils/Utils';
import Sidebar from './Sidebar';
import Post from './Post';

import './css/App.css';

function App() 
{
	const [ posts, setPosts ] = useState( [] );
	const [ listingData, setListingData ] = useState( {} );

	// laod listing by name
	// set `next = true` to load next page of current listing
	function loadListing( listing, next = false )
	{
		var params = next ? { after: listingData.after } : {};

		redditGet( listing, params ).then( json => {
            setPosts( prev => [ ...prev, ...json.data.children ]);
            setListingData({ listing, after: json.data.after });
        });
	}

	// load next page for current listing
	function loadMore()
	{
		loadListing( listingData.listing, true );
	}


	return (
		<>
			<h1>
				Reddit Client!
			</h1>
			<Sidebar loadListing={ loadListing } />

			{
				// print all posts
				posts.map( ( post ) => {
					return (
						<Post key={ post.data.id } post={ post } />
					)
				})
			}

			{	// show load more button only if there is an active listing
				listingData.listing &&
					<button onClick={ loadMore }>Load More</button>
			}
		</>
	);
}

export default App;
