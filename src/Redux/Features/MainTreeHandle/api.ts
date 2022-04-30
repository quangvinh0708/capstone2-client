import {
    Big5API,
    SUGGEST_QUESTIONS_END_POINT,
} from "../../../View/Commons/Api/api";
import { BIG5_API_URI } from "./../../../View/Commons/Api/api";
import { Container } from "./reducer";

const big5API = new Big5API();

export const apiGetSuggestQuestion = async ({ keyword, facet }: Container) => {
    return await big5API.get(
        `${BIG5_API_URI}/${SUGGEST_QUESTIONS_END_POINT}?keyword=${keyword.label}&facet=${facet.label}`
    );
};
