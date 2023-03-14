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

export function getBlockchainNetwork(chainId: number): NetworkConfig {
	switch (chainId) {
		case CHAIN_ID_AVAX_TESTNET:
			return {
				networkName: 'Avalanche FUJI C-Chain',
				networkRpcUrl:
					'https://palpable-light-telescope.avalanche-testnet.quiknode.pro/3319775fc3311fa18dcba7018009b9fdf76bb2e9/ext/bc/C/rpc',
				chainId: CHAIN_ID_AVAX_TESTNET,
				chainSymbol: AVAX,
				explorer: 'https://testnet.snowtrace.io/',
				networkType: TESTNET,
			};
		case CHAIN_ID_MATIC_TESTNET:
			return {
				networkName: 'Matic Mumbai',
				networkRpcUrl:
					'https://chaotic-blue-diagram.matic-testnet.quiknode.pro/7cc140600b3c938447e97e87ff322d50f5cda3a3/',
				chainId: CHAIN_ID_MATIC_TESTNET,
				chainSymbol: MATIC,
				explorer: 'https://mumbai.polygonscan.com/',
				networkType: TESTNET,
			};
		case CHAIN_ID_AVAX_MAINNET:
			return {
				networkName: 'Avalanche Mainnet C-Chain',
				networkRpcUrl: 'https://api.avax.network/ext/bc/C/rpc',
				chainId: CHAIN_ID_AVAX_MAINNET,
				chainSymbol: AVAX,
				explorer: 'https://snowtrace.io/',
				networkType: MAINNET,
			};
		case CHAIN_ID_MATIC_MAINNET:
			return {
				networkName: 'Matic Mainnet',
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
