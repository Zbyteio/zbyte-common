import { NetworkConfig, OperationSign } from './common';
import { UnsignedBatchTx } from './transaction';

export interface IWalletConnector {
	setNetwork(networkConfig: NetworkConfig): Promise<void>;
	getNetwork(): NetworkConfig;
	isConnected(): boolean;
	/**
	 *
	 * @param value
	 */
	injectAuthVerifier(value: any): void;
	/**
	 * @description Transfer token to other person
	 *
	 * @param toAddress recipent address
	 * @param amount number of zbyte token
	 * @returns receipt for the blockchain transaction
	 */
	sendToken(toAddress: string, amount: string): Promise<any>;

	/**
	 * @description fetch the user address
	 * @returns account address
	 */
	getAddress(): Promise<string>;

	/**
	 * @description connect to wallet
	 */
	connect(): void;

	batchSignTypedV4Data(txnBatch: UnsignedBatchTx): Promise<Array<OperationSign>>;

	/**
	 * @description Fetch zbyte token for the given user's address
	 * @param address User's account address
	 * @returns token balance string
	 */
	getTokenBalance(address: string): Promise<string>;

	/**
	 * @description fetch the transaction history of user
	 * @param address User address whose transaction need to list
	 * @returns list of transaction
	 */
	listTransaction(address: string): Array<any>;
}

export interface IzbyteWallet {
	/**
	 * @description Transfer token to other person
	 *
	 * @param toAddress recipent address
	 * @param amount number of zbyte token
	 * @returns receipt for the blockchain transaction
	 */
	sendToken(toAddress: string, amount: string): Promise<any>;

	/**
	 * @description fetch the user address
	 * @returns account address
	 */
	getAddress(): Promise<string>;

	/**
	 * @description connect to wallet
	 */
	connect(): void;

	signTypedData(transaction: string, chainId: number): Promise<string>;

	/**
	 * @description Fetch zbyte token for the given user's address
	 * @param address User's account address
	 * @returns token balance string
	 */
	getTokenBalance(address: string): Promise<string>;

	/**
	 * @description fetch the transaction history of user
	 * @param address User address whose transaction need to list
	 * @returns list of transaction
	 */
	listTransaction(address: string): Array<any>;
}

export interface IKeyProvider {
	/**
	 * @description Name of the key provider
	 */
	readonly serviceProviderName: string;

	/**
	 * @description Add Network to the given key provider
	 * @param networkConfig Network Information of the blockchain
	 */
	addChain(networkConfig: NetworkConfig): Promise<void>;

	/**
	 * @description Switch default network to the given key provider,
	 *              switchChain only supported on the added chain.
	 * @param chainId chainId in hex string format e.g 0x89(137)
	 */
	switchChain(chainId: string): Promise<void>;
	getProvider(): any;
}

export interface IWalletProvider {
	/**
	 * @description Use to connect the wallet provider.
	 */
	connect(): Promise<boolean>;
	/**
	 * @description fetch the wallet provider which internally set the provider
	 * @param networkConfig Blockchain Network parameters
	 */
	getKeyProvider(networkConfig: NetworkConfig): Promise<IKeyProvider>;
}

export interface IWalletUI {
	/**
	 * @description fetch the user address
	 * @returns account address
	 */
	getAddress(): Promise<string>;
	/**
	 * @description connect to wallet
	 */
	connect(): Promise<any>;
	/**
	 * @description signs the transactions in batch
	 * @param transaction Transactions which needs to get signed
	 */
	batchSignTypedData(transaction: UnsignedBatchTx): Promise<OperationSign[]>;
	/**
	 * initializes the wallet
	 * @param chainSymbol network symbol
	 * @param authVerifier authentication token, type and expiry
	 */
	init(
		chainId: number,
		authVerifier: {
			accessToken: string;
			typeOfToken: string;
			tokenExpiry: number;
		}
	): void;
	/**
	 * @description opens the wallet ui/ux
	 */
	open(): void;

	/**
	 * @description tells whether wallet is connected to keyprovider or not.
	 */
	isConnected(): boolean;
}
