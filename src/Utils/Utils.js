
// get reddit listing by endpoint ( e.g. /hot, /r/ProgrammerHumor, /u/pedro19 ) and parameters
export async function redditGet( endpoint, params )
{
    // reddit base URL
    const BASE_URL = 'https://www.reddit.com';
    var httpParams = '';

    if( params )
    {
        // serialize `params` to HTTP GET parameters
        httpParams = Object.keys( params ).map( key => {
            return key + '=' + params[key];
        }).join('&');
    }

    // build endpoint & fetch data
    endpoint = `${ BASE_URL }/${ endpoint }.json?${ httpParams }`;

    return fetch( endpoint ).then( res => res.json() );
}