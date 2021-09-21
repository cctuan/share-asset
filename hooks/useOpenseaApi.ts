
import { useState, useEffect } from 'react'
import axios from 'axios'

axios.defaults.baseURL = 'https://api.opensea.io/api/v1'
export interface IAxios {
    url: string,
    method: 'get' | 'post' | 'put' | 'delete',
    body: any,
    headers?: any
}

export interface IOpenseaOwner {
    user: string | null,
    profile_img_url: string,
    address: string,
    config: string
}

export interface IAssetContract {
    address: string;
    asset_contract_type: string;
    created_date: Date;
    name: string;
    nft_version: string;
    opensea_version?: any;
    owner: number;
    schema_name: string;
    symbol: string;
    total_supply: string;
    description: string;
    external_link: string;
    image_url: string;
    default_to_fiat: boolean;
    dev_buyer_fee_basis_points: number;
    dev_seller_fee_basis_points: number;
    only_proxied_transfers: boolean;
    opensea_buyer_fee_basis_points: number;
    opensea_seller_fee_basis_points: number;
    buyer_fee_basis_points: number;
    seller_fee_basis_points: number;
    payout_address: string;
}

export interface IAssetObjectInterface {
    token_id: string,
    image_url: string,
    background_color: string,
    name: string,
    external_link: string,
    asset_contract: IAssetContract,
    owner: IOpenseaOwner,
    permalink: string
}

export interface IOpenseaReponse {
    assets: IAssetObjectInterface[]
}

export const fetchOpenseaApi = async({ url, method, body = {}, headers = {} }: IAxios) => {
    const response = await axios[method](url, headers, body)
    return response
}

export const useOpenseaApi = ({ url, method, body = {}, headers = {} }: IAxios) => {
    const [response, setResponse] = useState<IOpenseaReponse | null>(null);
    const [error, setError] = useState('');
    const [loading, setloading] = useState(true);
    const fetchData = async () => {
        await axios[method](url, headers, body)
            .then((res) => {
                console.log('data changed')

                setResponse(res.data);
            })
            .catch((err) => {
                console.log('err changed')

                setError(err);
            })
            .finally(() => {
                console.log('loading changed')
                setloading(false);
            });
    };

    useEffect(() => {
        fetchData();
    }, [method, url, JSON.stringify(body), JSON.stringify(headers)]);

    return { response, error, loading };
};
