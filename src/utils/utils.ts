import axios, { AxiosError } from 'axios';
import {
	AVAX,
	CHAIN_ID_AVAX_MAINNET,
	CHAIN_ID_AVAX_TESTNET,
	CHAIN_ID_MATIC_MAINNET,
	CHAIN_ID_MATIC_TESTNET,
	MAINNET,
	MATIC,
	TESTNET,
} from '../constants/networks';
import { NetworkConfig } from '../types/common';
import { IPFSImageDetails, OpenSeaERC721Metadata } from '../types/erc721metadata';

export function getBlockchainNetwork(chainId: number): NetworkConfig {
	switch (chainId) {
		case CHAIN_ID_AVAX_TESTNET:
			return {
				networkName: 'Avalanche',
				networkRpcUrl: 'https://api.avax-test.network/ext/bc/C/rpc',
				chainId: CHAIN_ID_AVAX_TESTNET,
				chainSymbol: AVAX,
				explorer: 'https://testnet.snowtrace.io/',
				networkType: TESTNET,
			};
		case CHAIN_ID_MATIC_TESTNET:
			return {
				networkName: 'Polygon',
				networkRpcUrl: 'https://rpc-mumbai.maticvigil.com/',
				chainId: CHAIN_ID_MATIC_TESTNET,
				chainSymbol: MATIC,
				explorer: 'https://mumbai.polygonscan.com/',
				networkType: TESTNET,
			};
		case CHAIN_ID_AVAX_MAINNET:
			return {
				networkName: 'Avalanche',
				networkRpcUrl: 'https://api.avax.network/ext/bc/C/rpc',
				chainId: CHAIN_ID_AVAX_MAINNET,
				chainSymbol: AVAX,
				explorer: 'https://snowtrace.io/',
				networkType: MAINNET,
			};
		case CHAIN_ID_MATIC_MAINNET:
			return {
				networkName: 'Polygon',
				networkRpcUrl: 'https://rpc-mainnet.maticvigil.com/',
				chainId: CHAIN_ID_MATIC_MAINNET,
				chainSymbol: MATIC,
				explorer: 'https://polygonscan.com/',
				networkType: MAINNET,
			};
		default:
			throw new Error('Given blockchain Id is not yet supported');
	}
}

export function getSupportedBlockchainNetworkList() {
	const supportedChainIds = [
		CHAIN_ID_AVAX_MAINNET,
		CHAIN_ID_AVAX_TESTNET,
		CHAIN_ID_MATIC_MAINNET,
		CHAIN_ID_MATIC_TESTNET,
	];
	const blockchainNetworks: Array<NetworkConfig> = [];
	supportedChainIds.forEach((chainId) => {
		blockchainNetworks.push(getBlockchainNetwork(chainId));
	});
	return blockchainNetworks;
}

export function convertzByteToUsd(zbyteAmount: string, precisionScale = 2) {
	const value = Number(zbyteAmount) * 0.02;
	return Number(value).toFixed(precisionScale);
}

export async function getNFTMetaData(tokenURI: string): Promise<OpenSeaERC721Metadata> {
	try {
		const response = await axios.get(tokenURI);
		return response.data;
	} catch (error) {
		const axiosError = error as AxiosError;
		if (axiosError.response?.status === 503) {
			throw new Error('IPFS service is temporarily Down');
		} else {
			throw new Error('Failed to fetch the metaData from IPFS');
		}
	}
}

export async function getImageDetailsFromIPFS(ipfsURL: string): Promise<IPFSImageDetails> {
	try {
		const response = await axios.get(ipfsURL);
		return {
			imageData: response.data,
			sizeInBytes: response.headers['content-length'],
			imageType: response.headers['content-type'],
		};
	} catch (error) {
		const axiosError = error as AxiosError;
		if (axiosError.response?.status === 503) {
			throw new Error('IPFS service is temporarily Down');
		} else {
			throw new Error('Failed to fetch the metaData from IPFS');
		}
	}
}
