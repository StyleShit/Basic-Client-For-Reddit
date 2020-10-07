import React from 'react';

export default function Post({ post:{ data } })
{
    var flair = {
        bg: data.link_flair_background_color,
        text: data.link_flair_text_color === 'light' ? '#FFF' : '#000'
    };

    return (
        <div className="reddit-post">
            <h3>
                { data.title } 
                
                <span className="flair" style={{ backgroundColor: flair.bg, color: flair.text }}>
                    { data.link_flair_text}
                </span>
            </h3>
            
            <strong>By /u/{ data.author } on /r/{ data.subreddit }</strong><br />

            { data.thumbnail !== 'self' &&
                <img alt={ data.title } src={ data.thumbnail } />
            }
        </div>
    )
}
