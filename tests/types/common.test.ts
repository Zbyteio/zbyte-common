import { NetworkConfig, OperationSign } from '../../src/types/common';

test('NetworkConfig should have the correct properties', () => {
	const networkConfig: NetworkConfig = {
		networkName: 'testnet',
		networkRpcUrl: 'https://testnet.network.com',
		chainId: 1,
		chainSymbol: 'ETH',
		explorer: 'https://explorer.testnet.network.com',
		networkType: 'testnet',
	};

	expect(networkConfig).toHaveProperty('networkName');
	expect(networkConfig).toHaveProperty('networkRpcUrl');
	expect(networkConfig.iconPath).toBeUndefined();
	expect(networkConfig).toHaveProperty('chainId');
	expect(networkConfig).toHaveProperty('chainSymbol');
	expect(networkConfig).toHaveProperty('explorer');
	expect(networkConfig).toHaveProperty('networkType');
});

test('OperationSign should have the correct properties', () => {
	const operationSign: OperationSign = {
		operationName: 'operation',
		signature: '0x123456',
	};

	expect(operationSign).toHaveProperty('operationName');
	expect(operationSign).toHaveProperty('signature');
});
