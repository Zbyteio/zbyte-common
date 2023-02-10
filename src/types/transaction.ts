export interface Args {
    name: string,
    type: string,
    value: any
}

type Types = { name: string, type: string }[]

export interface Domain {
    name: string,
    version?: string,
    chainId: number,
    verifyingContract?: string,
}

export interface TxnMetadata {
    functionName: string,
    contractHash?: string,
    args?: Args[],
    subOperation: string
}

export interface UnSignedTxnMetaData {
    operation: RelayOperations,
    zbyteTokens: string,
    contractHash?: string,
    functionName: string,
    contractArgs?: Args[]
}

export interface UnsignedTxn {
    data: {
        types: {
            [key: string]: Types,
            EIP712Domain: Types
        },
        domain: Domain,
        primaryType: string,
        message: any
    },
    metadata: TxnMetadata
}

export enum RelayOperations {
    INVOKE,
    DEPLOY
}

export interface UnsignedBatchTx {
    transactions: UnsignedTxn[],
    metadata: UnSignedTxnMetaData
}