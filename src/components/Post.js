import React, { useState } from 'react';

export default function Post({ post:{ data } })
{
    // determine if the full sized image will be shown
    const [ showFullImage, setShowFullImage ] = useState( false );

    // set flair styling
    var flair = {
        bg: data.link_flair_background_color,
        text: data.link_flair_text_color === 'light' ? '#FFF' : '#000'
    };


    // determine post image src
    var imageSrc;

    switch( data.thumbnail )
    {
        case 'image':
            imageSrc = "img/default-thumb.png";
            break;
            
        case 'self':
            imageSrc = "img/default-thumb.png";
            break;

        case 'default':
            imageSrc = "img/default-thumb.png";
            break;

        default:
            imageSrc = data.thumbnail;
            break;
    }

    
    // format big numbers with K & M
    function formatNumber( num )
    {
        if( num > 1000000 )
            return ( num / 1000000 ).toFixed( 1 ) + 'M';

        if( num > 1000 )
            return ( num / 1000 ).toFixed( 1 ) + 'K';

        return num;
    }


    // return the time passed since `date` in words
    function timeSince( date )
    {
        var seconds = Math.floor((new Date() - date) / 1000);
        var interval = seconds / 31536000;
      
        // years
        if( interval >= 1 )
            return Math.floor(interval) + " years";

        interval = seconds / 2592000;
        
        // months
        if( interval >= 1 )
            return Math.floor(interval) + " months";

        interval = seconds / 86400;
        
        // days
        if( interval >= 1 )
            return Math.floor(interval) + " days";

        interval = seconds / 3600;
        
        // hours
        if( interval >= 1 )
            return Math.floor(interval) + " hours";

        interval = seconds / 60;
        
        // minutes
        if( interval >= 1 )
            return Math.floor(interval) + " minutes";

        return Math.floor(seconds) + " seconds";
      }


    // when the post was created
    var createdAt = new Date( data.created_utc * 1000 );

    // url_overridden_by_dest

    return (
        <div className="reddit-post">

            <img alt={ data.title } src={ imageSrc } onClick={ e => { setShowFullImage( prev => !prev ) }} />

            <div className="post-text">
                <h3 className="post-title">
                            
                    { data.link_flair_text &&
                        <span className="flair" style={{ backgroundColor: flair.bg, color: flair.text }}>
                            { data.link_flair_text}
                        </span>
                    }

                    <a target="_blank" rel="noopener noreferrer" href={ `https://www.reddit.com${ data.permalink }` }>
                        { data.title } 
                    </a>
                    
                </h3>
            
                <span className="post-author">
                    <span className="muted">Submitted { timeSince( createdAt ) } ago by </span>
                    <i className="las la-user"></i>
                    <a target="_blank" 
                        rel="noopener noreferrer"
                        href={ `https://www.reddit.com/user/${data.author}` }>{ data.author }</a>
                </span>
            </div>

            <div className="post-score">
                <span className="upvote"></span>
                { formatNumber( data.ups ) }
                <span className="downvote"></span>
            </div>

            { showFullImage &&
                <div className="post-full-image">
                    <a href={ data.url } target="__blank" rel="noopener noreferrer">
                        <img alt={ data.title } src={ data.url } />
                    </a>
                </div>
            }
        </div>
    )
}
