import {
	convertzByteToUsd,
	getBlockchainNetwork,
	getSupportedBlockchainNetworkList,
} from '../../src/utils/utils';
import {
	CHAIN_ID_AVAX_TESTNET,
	CHAIN_ID_AVAX_MAINNET,
	CHAIN_ID_MATIC_TESTNET,
	CHAIN_ID_MATIC_MAINNET,
	AVAX,
	MATIC,
	TESTNET,
	MAINNET,
} from '../../src/constants';
import { NetworkConfig } from '../../src/types/common';

describe('convertzByteToUsd', () => {
	// Positive scenario - should convert zByte to USD correctly with default precision scale
	test('should convert zByte to USD with default precision scale', () => {
		const result = convertzByteToUsd('10');
		expect(result).toBe('0.20');
	});

	// Positive scenario - should convert zByte to USD correctly with specified precision scale
	test('should convert zByte to USD with specified precision scale', () => {
		const result = convertzByteToUsd('10', 4);
		expect(result).toBe('0.2000');
	});

	// Negative scenario - should return NaN if zByteAmount is not a number
	test('should return NaN if zByteAmount is not a number', () => {
		const result = convertzByteToUsd('not a number');
		expect(result).toBe('NaN');
	});

	// Negative scenario - should return NaN if precisionScale is not a number
	test('should return NaN if precisionScale is not a number', () => {
		const result = convertzByteToUsd('10', NaN);
		expect(result).toBe('0');
	});
});

describe('getBlockchainNetwork', () => {
	// Positive scenario - should return the correct network configuration for Avalanche FUJI C-Chain
	test('should return correct network config for Avalanche FUJI C-Chain', () => {
		const chainId = CHAIN_ID_AVAX_TESTNET;
		const expectedNetworkConfig: NetworkConfig = {
			networkName: 'Avalanche',
			networkRpcUrl: 'https://api.avax-test.network/ext/bc/C/rpc',
			chainId: CHAIN_ID_AVAX_TESTNET,
			chainSymbol: AVAX,
			explorer: 'https://testnet.snowtrace.io/',
			networkType: TESTNET,
		};
		const result = getBlockchainNetwork(chainId);
		expect(result).toEqual(expectedNetworkConfig);
	});

	// Positive scenario - should return the correct network configuration for Matic Mumbai
	test('should return correct network config for Matic Mumbai', () => {
		const chainId = CHAIN_ID_MATIC_TESTNET;
		const expectedNetworkConfig: NetworkConfig = {
			networkName: 'Polygon',
			networkRpcUrl: 'https://rpc-mumbai.maticvigil.com/',
			chainId: CHAIN_ID_MATIC_TESTNET,
			chainSymbol: MATIC,
			explorer: 'https://mumbai.polygonscan.com/',
			networkType: TESTNET,
		};
		const result = getBlockchainNetwork(chainId);
		expect(result).toEqual(expectedNetworkConfig);
	});

	// Positive scenario - should return the correct network configuration for Avalanche Mainnet C-Chain
	test('should return correct network config for Avalanche Mainnet C-Chain', () => {
		const chainId = CHAIN_ID_AVAX_MAINNET;
		const expectedNetworkConfig: NetworkConfig = {
			networkName: 'Avalanche',
			networkRpcUrl: 'https://api.avax.network/ext/bc/C/rpc',
			chainId: CHAIN_ID_AVAX_MAINNET,
			chainSymbol: AVAX,
			explorer: 'https://snowtrace.io/',
			networkType: MAINNET,
		};
		const result = getBlockchainNetwork(chainId);
		expect(result).toEqual(expectedNetworkConfig);
	});

	// Positive scenario - should return the correct network configuration for Matic Mainnet
	test('should return correct network config for Matic Mainnet', () => {
		const chainId = CHAIN_ID_MATIC_MAINNET;
		const expectedNetworkConfig: NetworkConfig = {
			networkName: 'Polygon',
			networkRpcUrl: 'https://rpc-mainnet.maticvigil.com/',
			chainId: CHAIN_ID_MATIC_MAINNET,
			chainSymbol: MATIC,
			explorer: 'https://polygonscan.com/',
			networkType: MAINNET,
		};
		const result = getBlockchainNetwork(chainId);
		expect(result).toEqual(expectedNetworkConfig);
	});

	// Negative scenario - should throw an error if the given blockchain id is not supported
	test('getBlockchainNetwork should throw error for unsupported chain id', () => {
		const unsupportedChainId = 123;
		expect(() => getBlockchainNetwork(unsupportedChainId)).toThrowError(
			'Given blockchain Id is not yet supported'
		);
	});
});

test('getSupportedBlockchainNetworkList should return an array of supported blockchain networks', () => {
	const supportedChainIds = [
		CHAIN_ID_AVAX_MAINNET,
		CHAIN_ID_AVAX_TESTNET,
		CHAIN_ID_MATIC_MAINNET,
		CHAIN_ID_MATIC_TESTNET,
	];

	const expectedBlockchains = supportedChainIds.map((chainId) => getBlockchainNetwork(chainId));

	const blockchainNetworks = getSupportedBlockchainNetworkList();

	expect(blockchainNetworks).toEqual(expectedBlockchains);
});
