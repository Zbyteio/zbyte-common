/**
 * @description: Agrs interface is mostly used for smart-contract function arguments
 * @param name: name of the agrument e.g userAddress
 * @param type: type of argument
 * @param value: actual value of the parameter
 */
export interface Args {
	name: string;
	type: string;
	value: any;
}

type Types = { name: string; type: string }[];

export interface Domain {
	name: string;
	version?: string;
	chainId: number;
	verifyingContract?: string;
}

export interface TxnMetadata {
	functionName: string;
	contractHash?: string;
	args?: Args[];
	subOperation: string;
}

export interface UnSignedTxnMetaData {
	operation: RelayOperations;
	dplatTokens: string;
	contractHash?: string;
	functionName: string;
	contractArgs?: Args[];
	chainID: number;
}

/**
 * @description: Interface of Sub-transaction
 * @param data: The actual data which will get signed follows(EIP-712)
 * @param metadata: The metadata associated with the sub-transaction it will be used by the wallet UI.
 */
export interface UnsignedTxn {
	data: {
		types: {
			[key: string]: Types;
			EIP712Domain: Types;
		};
		domain: Domain;
		primaryType: string;
		message: any;
	};
	metadata: TxnMetadata;
}

/**
 * @description transaction operation supported by the Relay-Server
 */
export enum RelayOperations {
	INVOKE,
	DEPLOY,
	TRANSFER,
	NFT_TRANSFER,
}

/**
 * @description Interface for the unsigned transaction which will contains the information which user will going to sign
 * @param transactions: list of unsigned transaction (sub-transactions)
 * @param metadata: Info about the actual transaction
 */
export interface UnsignedBatchTx {
	transactions: UnsignedTxn[];
	metadata: UnSignedTxnMetaData;
}
