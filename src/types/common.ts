/**
 * @description Interface contains the blockchain network config information
 * @param networkName: Name of the network
 * @param networkRpcUrl: RPC url to connect the blockchain node
 * @param iconPath: url or path for the given blockchain icon
 * @param chainId: chainId of the blockchain network
 * @param chainSymbol: blockchain currency/token name eg. avax, matic
 * @param explorer: url link to blockchain network explorer
 * @param networkType: it should be either testnet or mainnet
 */
export interface NetworkConfig {
	networkName: string;
	networkRpcUrl: string;
	iconPath?: string;
	chainId: number;
	chainSymbol: string;
	explorer: string;
	networkType: string;
}

export interface OperationSign {
	operationName: string;
	signature: string;
}
