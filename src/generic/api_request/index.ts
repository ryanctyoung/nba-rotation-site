const PORT = 8081;

const urlPrefix = ''
// const urlPrefix = process.env.NODE_ENV ==='development' ? 'http://localhost' : 'https://nba-rotation-tracker-716366dfba17.herokuapp.com/'
const urlPath = ``

export default function (subpath: string, params = {}, method = 'GET'): Promise<any> {
 
        const options = {
        method,
        headers: { 'Content-Type': 'application/json' },
        };
    
        let url = urlPath + subpath;
        if (method === 'GET') {
            url += `?${new URLSearchParams(params)}`;
            console.log(`URL for GET request: ${url}`);

        } else if (method === 'POST' || method === 'UPDATE') {
            console.log(`URL for POST/UPDATE request: ${url}`);
            return fetch(url, {body: JSON.stringify(params), ...options}).then((response) => response.json());
        } else {
            console.error('Invalid method');
            throw Error
        }
    
        return fetch(url, options).then((response) => response.json());
    }

  