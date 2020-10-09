import React, { useState, useEffect  } from 'react';
import { redditGet } from '../Utils/Utils';

export default function AutoComplete({ placeholder, className, onItemSelected })
{
    const [ term, setTerm ] = useState( '' );
    const [ suggestions, setSuggestions ] = useState( [] );
    const [ currentSuggestion, setCurrentSuggestion ] = useState( -1 ); // represents an id in `suggestions` array
    const [ isLoading, setIsLoading ] = useState( false );


    // catch arrow keys & enter in the autocomplete input
    function onKeyUp( e )
    {
        switch( e.keyCode || e.which )
        {
            // up arrow -> highlight previous suggestion
            case 38:
                if( currentSuggestion > 0 )
                    setCurrentSuggestion( prev => prev - 1 );

                else
                    setCurrentSuggestion( suggestions.length - 1 );

                break;

            // down arrow -> highlight next suggestion
            case 40:
                if( currentSuggestion < suggestions.length -1 )
                    setCurrentSuggestion( prev => prev + 1 );
                else
                    setCurrentSuggestion( 0 );
                break;

            // enter -> invoke the onItemSelected callback and reset everything
            case 13:
    
                if( currentSuggestion !== -1 )
                {
                    onItemSelected( suggestions[currentSuggestion] );
                    setTerm( '' );
                    setSuggestions( [] );
                    setCurrentSuggestion( -1 );
                }

                break;
            
            default:
                break;
        }
    }
    

    // when the term changes, invoke the autocomplete
    useEffect( () => {

        if( term.trim() === '')
        {
            setSuggestions( [] );
            return;
        }

        // set a timeout to prevent too many requests on keyup
        const keyupTimeout = setTimeout( () => {

            var params = {
                type: 'sr',
                q: term
            };
            
            var endpoint = 'search';

            setIsLoading( true );
            
            // send search term to the endpoint
            redditGet( endpoint, params ).then( json => {

                if( json.data )
                {
                    // set autocomplete suggestions
                    var results = json.data.children.slice( 0, 5 );

                    results = results.map( item => ( item.data ));
                    setSuggestions( results) ;
                }

                setIsLoading( false );

            });

        }, 300 );

        return() => {
            // clear the timeout
            clearTimeout( keyupTimeout );    
        }
    }, [ term ]);


    return (
        <>
            <i class="las la-search"></i>
            
            <input type="text" 
                className={ `autocomplete-input ${ className }` } 
                placeholder={ placeholder } 
                value={ term } 
                onChange={ e => setTerm( e.target.value ) }
                onKeyUp={ onKeyUp } />

            { isLoading &&
                <span className="autocomplete-loader"></span>
            }

            <div className="autocomplete-suggestions">
                {
                    // display the autocomplete suggestions
                    suggestions.map(( item, i ) => (
                        <span className={ `suggestion ${ currentSuggestion === i ? 'current-suggestion' : '' }` } onClick={ () => { onItemSelected( item ) } } key={ i }>
                            <img alt={ item.display_name_prefixed } src={ item.icon_img ? item.icon_img : 'img/default-sr-icon.png' } />
                            { item.display_name_prefixed }
                        </span>
                    ))
                }
            </div>
        </>
    )
}
