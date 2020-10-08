import React from 'react';
import Post from './Post';

export default function Content({ listingData, posts, loadMore, postsContainer, isLoading })
{
    return (
        <div className="content">

            <div className="top-bar">
                <h2 className="listing-name">
                    { listingData.listing && !isLoading ? listingData.listing : 'Loading...' }
                </h2>

                <div className="top-bar-right">
                    
                    <div className="search-container">
                        <form action="#">
                            <input type="text" className="search-input" placeholder="Search" />
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

                {	// show load more button only if there is an active listing
                    listingData.listing && !isLoading &&
                        <button className="load-more-btn" onClick={ loadMore }>Load More</button>
                }

                {   // show loader if the application is loading
                    isLoading &&
                    <div className="loader"></div>
                }
            </div>
        </div>
    )
}
