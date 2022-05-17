import {
    Big5API,
    QUESTIONS_END_POINT,
    SUGGEST_QUESTIONS_END_POINT,
} from "../../../View/Commons/Api/api";
import { BIG5_API_URI } from "./../../../View/Commons/Api/api";
import { Container } from "./reducer";

const big5API = new Big5API();

export const apiGetSuggestQuestion = async ({ keyword, facet }: Container) => {
    return await big5API.get(
        `${BIG5_API_URI}/${SUGGEST_QUESTIONS_END_POINT}?keyword=${keyword.title}&facet=${facet.title}`
    );
};

export const apiGetKeywords = async () => {
    return await big5API.get(`${BIG5_API_URI}/keywords`);
};

export const apiGetFacets = async () => {
    return await big5API.get(`${BIG5_API_URI}/facets`);
};

export const apiGetQuestion = async ({ keyword, facet }: Container) => {
    return await big5API.get(
        `${BIG5_API_URI}/${QUESTIONS_END_POINT}?keyword=${keyword.title}&facet=${facet.title}`
    );
};

export const addSuggestedQuestionToDB = async (body) => {
    return await big5API.post(
        `${BIG5_API_URI}/${SUGGEST_QUESTIONS_END_POINT}`,
        body
    );
};

export const addAndSendQuestion = async (body) => {
    return await big5API.post(
        `${BIG5_API_URI}/${SUGGEST_QUESTIONS_END_POINT}/save-and-send`,
        body
    );
};

export const updateQuestionInDB = async (body) => {
    return await big5API.put(`${BIG5_API_URI}/${QUESTIONS_END_POINT}`, body);
};

export const apiDeleteSuggestQuestion = async (id) => {
    return await big5API.delete(
        `${BIG5_API_URI}/${SUGGEST_QUESTIONS_END_POINT}/${id}`
    );
};

export const apiGetOutputModelResult = async (body) => {
    return await big5API.post(
        `${BIG5_API_URI}/${QUESTIONS_END_POINT}/get-output-model-result`,
        body
    );
};

export const apiGenerateSuggestQuestions = async (body) => {
    return await big5API.post(
        `${BIG5_API_URI}/${SUGGEST_QUESTIONS_END_POINT}/generate-suggest-questions`,
        body
    );
};
