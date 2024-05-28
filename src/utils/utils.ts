import axios, { AxiosError } from 'axios';
import {
	AVAX,
	CHAIN_ID_AVAX_MAINNET,
	CHAIN_ID_AVAX_TESTNET,
	CHAIN_ID_HBAR_MAINNET,
	CHAIN_ID_HBAR_TESTNET,
	CHAIN_ID_MATIC_MAINNET,
	CHAIN_ID_MATIC_TESTNET,
	HBAR,
	MAINNET,
	MATIC,
	TESTNET,
} from '../constants/networks';
import { NetworkConfig } from '../types/common';
import {
	NFTProcessResponse,
	NFTResponseData,
	OpenSeaERC721Metadata,
} from '../types/erc721metadata';

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
				networkRpcUrl: 'https://rpc-amoy.polygon.technology',
				chainId: CHAIN_ID_MATIC_TESTNET,
				chainSymbol: MATIC,
				explorer: 'https://www.oklink.com/amoy/',
				networkType: TESTNET,
			};
		case CHAIN_ID_HBAR_TESTNET:
			return {
				networkName: 'Hedera',
				networkRpcUrl: 'https://testnet.hashio.io/api',
				chainId: CHAIN_ID_HBAR_TESTNET,
				chainSymbol: HBAR,
				explorer: 'https://hashscan.io/testnet/dashboard/',
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
				networkRpcUrl: 'https://polygon-rpc.com',
				chainId: CHAIN_ID_MATIC_MAINNET,
				chainSymbol: MATIC,
				explorer: 'https://polygonscan.com/',
				networkType: MAINNET,
			};
		case CHAIN_ID_HBAR_MAINNET:
			return {
				networkName: 'Hedera',
				networkRpcUrl: 'https://mainnet.hashio.io/api',
				chainId: CHAIN_ID_HBAR_MAINNET,
				chainSymbol: HBAR,
				explorer: 'https://hashscan.io/mainnet/dashboard',
				networkType: MAINNET,
			};
		case 80001:
			return {
				networkName: 'Polygon',
				networkRpcUrl: 'https://rpc-mumbai.polygon.technology',
				chainId: 80001,
				chainSymbol: MATIC,
				explorer: 'https://mumbai.polygonscan.com/',
				networkType: TESTNET,
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
		CHAIN_ID_HBAR_MAINNET,
		CHAIN_ID_HBAR_TESTNET,
		80001,
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

export async function getImageDetailsFromIPFS(ipfsURL: string): Promise<Blob> {
	try {
		const response = await axios.get(ipfsURL, { responseType: 'blob' });
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

export async function processNFTData(
	nftDetail: NFTResponseData,
	isImageFromIPFS = true
): Promise<NFTProcessResponse> {
	const metadata = await getNFTMetaData(nftDetail.tokenURI);
	const imageData = isImageFromIPFS ? await getImageDetailsFromIPFS(metadata.image) : undefined;
	const processedNFT: NFTProcessResponse = {
		details: nftDetail,
		metadata: metadata,
		imageDetail: imageData,
	};
	return processedNFT;
}

export function isValidEVMAddress(address: string): boolean {
	const isValidFormat = /^(0x)[0-9a-fA-F]{40}$/i.test(address);
	if (!isValidFormat) {
		return false;
	}
	return true;
}

export function getRPCNetworkUrls(chainId: number): Array<string> {
	switch (chainId) {
		case CHAIN_ID_AVAX_TESTNET:
			return [
				'https://rpc.ankr.com/avalanche_fuji',
				'https://ava-testnet.public.blastapi.io/ext/bc/C/rpc',
				'https://avalanche-fuji.blockpi.network/v1/rpc/public',
			];
		case CHAIN_ID_MATIC_TESTNET:
			return [
				'https://polygon-amoy-bor-rpc.publicnode.com',
				'https://polygon-amoy.drpc.org',
				'https://polygon-amoy.blockpi.network/v1/rpc/public',
			];
		case CHAIN_ID_HBAR_TESTNET:
			return ['https://testnet.hashio.io/api'];
		case CHAIN_ID_AVAX_MAINNET:
			return [
				'https://avalanche.public-rpc.com',
				'https://endpoints.omniatech.io/v1/avax/mainnet/public',
				'https://rpc.ankr.com/avalanche',
			];
		case CHAIN_ID_MATIC_MAINNET:
			return [
				'https://polygon.llamarpc.com',
				'https://polygon-bor.publicnode.com',
				'https://rpc.ankr.com/polygon',
				'https://polygon.rpc.blxrbdn.com',
			];
		case CHAIN_ID_HBAR_MAINNET:
			return ['https://mainnet.hashio.io/api'];
		default:
			throw new Error('Given blockchain Id is not yet supported');
	}
}

export async function getOnlineRpcURL(chainId: number) {
	const rpcUrls = getRPCNetworkUrls(chainId);
	const promises = rpcUrls.map(isRpcURLOnline);
	return Promise.race(promises.filter((promise) => promise !== null)) as Promise<string | null>;
}

export async function isRpcURLOnline(rpcURL: string): Promise<string> {
	const data = JSON.stringify({
		method: 'eth_blockNumber',
		id: 0,
		jsonrpc: '2.0',
	});

	const config = {
		method: 'post',
		maxBodyLength: Infinity,
		url: rpcURL,
		headers: {
			'Content-Type': 'application/json',
		},
		data: data,
	};
	const result = await axios.request(config);
	if (result.data.error) {
		throw new Error('RPC node offline!!!');
	}
	return rpcURL;
}
