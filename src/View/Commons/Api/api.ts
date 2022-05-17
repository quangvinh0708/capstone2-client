import axios, { Axios } from "axios";

// export const BIG5_API_URI = "http://localhost:3009";
export const BIG5_API_URI =
    "https://server-greenbig5-application.herokuapp.com";
export const SUGGEST_QUESTIONS_END_POINT = "suggest-questions";
export const QUESTIONS_END_POINT = "questions";

export class Big5API {
    private readonly instance: Axios;
    constructor() {
        const instance = axios.create();
        instance.interceptors.response.use(
            this.handleSuccess,
            this.handleError
        );
        this.instance = instance;
    }

    handleSuccess(response) {
        return Promise.resolve(response);
    }

    handleError(error) {
        return Promise.reject(error);
    }

    get(url) {
        return this.instance.get(url);
    }

    post(url, body) {
        return this.instance.post(url, body);
    }

    put(url, body) {
        return this.instance.put(url, body);
    }

    delete(url) {
        return this.instance.delete(url);
    }
}

export default new Big5API();
