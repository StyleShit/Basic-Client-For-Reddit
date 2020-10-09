import React from 'react';
import Post from './Post';
import AutoComplete from './AutoComplete';

export default function Content({ listingData, posts, loadMore, postsContainer, isLoading, loadListing })
{

    // a callback to trigger when an item was selected from the autocomplete.
    function onItemSelected( item )
	{
        // load the selected subrteddit
		loadListing({ 
            listing: item.display_name_prefixed,
            icon: item.icon_img ? item.icon_img : 'img/default-sr-icon.png'
        });
    }
    
    return (
        <div className="content">

            <div className="top-bar">
                <h2 className="listing-name">
                    { listingData.icon && !isLoading &&
                        <img alt={ `${ listingData.listing } logo` } src={ listingData.icon } />
                    }

                    { listingData.listing && !isLoading ? listingData.listing : 'Loading...' }
                </h2>

                <div className="top-bar-right">
                    
                    <div className="search-container">
                        <form action="#" onSubmit={ e => e.preventDefault() }>
                            <AutoComplete className="search-input" placeholder="Search" onItemSelected={ onItemSelected } />
                        </form>
                    </div>

                    <div className="profile-container">
                        <i className="las la-user"></i> David
                    </div>
                </div>
            </div>

            <div className="posts-container" ref={ postsContainer }>
                {
                    // print all posts
                    posts.map( ( post ) => {
                        return (
                            <Post key={ post.data.id } post={ post } />
                        )
                    })
                }

                {	
                    // show load more button only if there is an active listing shown
                    listingData.listing && !isLoading &&
                    <button className="load-more-btn" onClick={ loadMore }>Load More</button>
                }

                {   
                    // show loader if the application is loading something
                    isLoading &&
                    <div className="loader"></div>
                }
            </div>
        </div>
    )
}
