import axios, { AxiosResponse } from "axios";
import md5 from "crypto-js/md5";
import { stringify } from "qs";

if (
  !process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY ||
  !process.env.NEXT_PUBLIC_MARVEL_PRIVATE_KEY
) {
  throw new Error(
    "NEXT_PUBLIC_MARVEL_PUBLIC_KEY and NEXT_PUBLIC_MARVEL_PRIVATE_KEY must be set"
  );
}

const BASE_URL = "https://gateway.marvel.com/v1/public/";

const api = axios.create({
  baseURL: `${BASE_URL}`,
  timeout: 15000,
});

type UrlType = string;

export const fetcher = async <T>(
  url: UrlType,
  call: (url: string) => Promise<AxiosResponse<T>>,
  params?: object
): Promise<T> => {
  try {
    const { hash, ts, publicKey } = getHash();

    const response: any = await call(
      `${url}?ts=${ts}&apikey=${publicKey}&hash=${hash}${
        params ? `&${stringify(params)}` : ""
      }`
    );
    return response.data.data;
  } catch (error: any) {
    if (error.response && 401 === error.response.status) {
      console.error("MarvelAPI#Error: ", error.response);
    }

    if (error.message === "Network Error") {
      return Promise.reject(new Error("Network Error"));
    }

    return Promise.reject(error);
  }
};

export const get = <T>(url: UrlType, params?: object): Promise<T> =>
  fetcher(url, api.get, params);

type Hash = {
  ts: number;
  hash: string;
  publicKey: string;
};

export const getHash = (): Hash => {
  const ts = new Date().getTime();

  const publicKey = process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY || "";
  const privateKey = process.env.NEXT_PUBLIC_MARVEL_PRIVATE_KEY || "";

  const hash = md5(ts + privateKey + publicKey).toString();

  return {
    ts,
    publicKey,
    hash,
  };
};
