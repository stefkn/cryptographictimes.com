

/*
TODO: Implement caching so that we don't blow up our API allowance!
*/

const fetcher = async (url) => {
    const res = await fetch(url)
    const data = await res.json()

    if (res.status !== 200) {
      throw new Error(data.message)
    }
    return data
}

const API_KEY = 'df3c7a145045e26b62072ff482c290c8a85856fc7a4bfab2a5f9b4da68abe195';
const BASE_URL = 'https://min-api.cryptocompare.com/data/histoday'

var cached_response = null;

export default (req, res) => {
    console.log("BITCOIN ENDPOINT HIT ----------- ");

    const ref_symbol = '?fsym=BTC';
    const comp_symbol = '&tsym=USD';
    const limit = '&limit=1';
    const aggregate = '&aggregate=1';
    const allData = '&allData=true';
    const apikey = `&api_key=${API_KEY}`;
    let endpoint = `${BASE_URL}${ref_symbol}${comp_symbol}${limit}${aggregate}${allData}${apikey}`;

    console.log(endpoint);

    if (cached_response === null) {
        let promise = fetcher(endpoint);

        promise.then(function (data) {
            console.log("promise resolved")
            cached_response = data;
            res.status(200).json({ status: 'success', data: data })
        });
    } else {
        console.log("CACHED---------------------")
        res.status(200).json({ status: 'success', data: cached_response })
    }

  }