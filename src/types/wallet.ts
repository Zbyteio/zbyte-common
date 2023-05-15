import { NetworkConfig, OperationSign } from './common';
import { UnsignedBatchTx } from './transaction';

export interface IzbyteWallet {
	/**
	 * @description set default blockchain config for wallet
	 * @param networkConfig blockchain config
	 */
	setNetwork(networkConfig: NetworkConfig): Promise<void>;
	/**
	 * @description get default blockchain config for wallet
	 */
	getNetwork(): NetworkConfig;

	/**
	 * @description Use to checked whether wallet connected or not.
	 */
	isConnected(): boolean;
	/**
	 * @description Transfer token to other person
	 *
	 * @param toAddress recipient address
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
	connect(): any;

	/**
	 * @description signs the transactions in batch
	 * @param transaction Transactions which needs to get signed
	 */
	batchSignTypedData(transaction: UnsignedBatchTx): Promise<OperationSign[]>;

	/**
	 * @description Fetch zbyte token for the given user's address
	 * @param address User's account address
	 * @returns token balance string
	 */
	getTokenBalance(address: string): Promise<string>;
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
	connect(): Promise<any>;
	/**
	 * @description Use to checked whether wallet provider connected or not.
	 */
	isConnected(): boolean;
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
	init(config: WalletUIConfig): void;
	/**
	 * @description opens the wallet ui/ux
	 */
	open(): void;

	/**
	 * @description tells whether wallet is connected to keyprovider or not.
	 */
	isConnected(): boolean;
}

export interface WalletUIConfig {
	defaultChainId?: number;
	baseUrl?: string;
	loginParams: Web3AuthLoginParams;
}

export interface Web3AuthLoginParams {
	clientId: string;
	domain: string;
	typeOfLogin?: LOGIN_TYPE;
	verifier: string;
	accessToken: string;
	tokenExpiry?: number;
	typeOfToken?: string;
}

export declare const LOGIN: {
	readonly GOOGLE: 'google';
	readonly FACEBOOK: 'facebook';
	readonly REDDIT: 'reddit';
	readonly DISCORD: 'discord';
	readonly TWITCH: 'twitch';
	readonly APPLE: 'apple';
	readonly GITHUB: 'github';
	readonly LINKEDIN: 'linkedin';
	readonly TWITTER: 'twitter';
	readonly WEIBO: 'weibo';
	readonly LINE: 'line';
	readonly EMAIL_PASSWORD: 'email_password';
	readonly PASSWORDLESS: 'passwordless';
	readonly JWT: 'jwt';
	readonly WEBAUTHN: 'webauthn';
};

export type LOGIN_TYPE = (typeof LOGIN)[keyof typeof LOGIN];
