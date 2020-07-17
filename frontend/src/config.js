const env = process.env.REACT_APP_ENV;

let url = "http://localhost:8000";

if (env === 'test') {
    url = "http://localhost:8010";
}

export const apiURL = {
    url,
};