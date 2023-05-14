import {PrivateKey, PublicKey, PublicKeyHash} from "@tonutils/keys";
import * as fs from "fs";

/**
 * KeyringDB is an abstract class that defines the interface for keyring database. It is used by Keyring to store and retrieve keys. You can implement your own KeyringDB and pass it to Keyring constructor.
 */
export abstract class KeyringDB {
    /**
     * Reads key from the database.
     */
    abstract readKey(keyHash: PublicKeyHash): Promise<Buffer | null>;

    /**
     * Writes key to the database.
     */
    abstract writeKey(keyHash: PublicKeyHash, key: Buffer): Promise<void>;

    /**
     * Deletes key from the database.
     */
    abstract delKey(keyHash: PublicKeyHash): Promise<void>;
}

/**
 * KeyringDBNoop is a dummy implementation of KeyringDB that does not store keys. It is used by default by Keyring.
 */
export class KeyringDBNoop extends KeyringDB {
    /**
     * Reads key from the database.
     */
    public readKey(keyHash: PublicKeyHash): Promise<Buffer | null> {
        return Promise.resolve(null);
    }

    /**
     * Writes key to the database.
     */
    public writeKey(keyHash: PublicKeyHash, key: Buffer): Promise<void> {
        return Promise.resolve();
    }

    /**
     * Deletes key from the database.
     */
    public delKey(keyHash: PublicKeyHash): Promise<void> {
        return Promise.resolve();
    }
}

/**
 * KeyringDBFileSystem is an implementation of KeyringDB that stores keys in a file system. It is used by Keyring when you pass a directory path to the constructor.
 */
export class KeyringDBFileSystem extends KeyringDB {
    private readonly dir: string;

    /**
     * Creates a new KeyringDBFileSystem instance.
     */
    constructor(dir: string) {
        super();
        this.dir = dir;
    }

    /**
     * Reads key from the database.
     */
    public readKey(keyHash: PublicKeyHash): Promise<Buffer | null> {
        return new Promise((resolve, reject) => {
            fs.readFile(this.dir + "/" + keyHash.serialize(), (err, data) => {
                if (err) {
                    if (err.code === "ENOENT") {
                        resolve(null);
                    } else {
                        reject(err);
                    }
                } else {
                    resolve(data);
                }
            });
        });
    }

    /**
     * Writes key to the database.
     */
    public writeKey(keyHash: PublicKeyHash, key: Buffer): Promise<void> {
        return new Promise((resolve, reject) => {
            fs.writeFile(this.dir + "/" + keyHash.serialize(), key, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    /**
     * Deletes key from the database.
     */
    public delKey(keyHash: PublicKeyHash): Promise<void> {
        return new Promise((resolve, reject) => {
            fs.unlink(this.dir + "/" + keyHash.serialize(), (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
}

/**
 * Keyring is an abstract class that defines the interface for keyring. You can implement your own Keyring and pass it to any class that requires a keyring. By default, Keyring uses KeyringDBNoop.
 */
export abstract class Keyring {

    /**
     * Creates a new Keyring instance. If db is not specified, KeyringDBNoop will be used.
     */
    public static create(db: KeyringDB = new KeyringDBNoop()): Keyring {
        return new KeyringImpl(db);
    }

    /**
     * Adds a key to the keyring. If temp is true, the key will be deleted when the program exits.
     */
    public abstract addKey(key: PrivateKey, temp?: true): Promise<void>;

    /**
     * Checks if a key exists in the keyring.
     */
    public abstract checkKey(keyHash: PublicKeyHash): Promise<boolean>;

    /**
     * Adds a key to the keyring using a short key hash. If the key is not found in the keyring, it will be loaded from the database.
     */
    public abstract addKeyShort(keyHash: PublicKeyHash): Promise<PublicKey>;

    /**
     * Deletes a key from the keyring.
     */
    public abstract delKey(keyHash: PublicKeyHash): Promise<void>;

    /**
     * Returns a public key from the keyring.
     */
    public abstract getPublicKey(keyHash: PublicKeyHash): Promise<PublicKey>;

    /**
     * Signs a message using a key from the keyring.
     */
    public abstract signMessage(keyHash: PublicKeyHash, data: Buffer): Promise<Buffer>;

    /**
     * Signs a message using a key from the keyring and returns the signature and the public key.
     */
    public abstract signAddGetPublicKey(keyHash: PublicKeyHash, data: Buffer): Promise<[Buffer, PublicKey]>;

    /**
     * Signs multiple messages using a key from the keyring.
     */
    public abstract signMessages(keyHash: PublicKeyHash, data: Buffer[]): Promise<Buffer[]>;

    /**
     * Encrypts a message using a key from the keyring.
     */
    public abstract encryptMessage(keyHash: PublicKeyHash, data: Buffer): Promise<{ publicKey: Buffer, digest: Buffer, encrypted: Buffer }>;

    /**
     * Decrypts a message using a key from the keyring.
     */
    public abstract decryptMessage(keyHash: PublicKeyHash, publicKey: Buffer, digest: Buffer, data: Buffer): Promise<Buffer>;

    /**
     * Returns a private key from the keyring.
     */
    public abstract getPrivateKey(publicKeyHash: PublicKeyHash): Promise<PrivateKey>;

    /**
     * Returns all keys from the keyring.
     */
    public abstract getKeys(): PublicKeyHash[];
}

/**
 * KeyringImpl is an implementation of Keyring that uses KeyringDB.
 */
export class KeyringImpl extends Keyring {

    private readonly map: Map<string, PrivateKey> = new Map();

    /**
     * Creates a new KeyringImpl instance.
     */
    constructor(private readonly db: KeyringDB) {
        super();
    }

    private async loadKey(keyHash: PublicKeyHash): Promise<PrivateKey> {
        if (this.map.has(keyHash.serialize())) {
            return this.map.get(keyHash.serialize())!;
        }

        const exportedKey = await this.db.readKey(keyHash);

        if (exportedKey === null) {
            throw new Error(`Key with hash ${keyHash.serialize()} not found`);
        }

        const privateKey = PrivateKey.import(exportedKey);

        const publicKey = privateKey.computePublicKey();
        const shortId = publicKey.computeShortId();

        if (!keyHash.equals(shortId)) {
            throw new Error(`Key with hash ${keyHash.serialize()} not found`);
        }

        this.map.set(keyHash.serialize(), privateKey);

        return privateKey;
    }

    /**
     * Adds a key to the keyring. If temp is true, the key will not be saved to the database. If temp is false, the key will be saved to the database.
     */
    public async addKey(privateKey: PrivateKey, temp?: true): Promise<void> {
        const publicKey = privateKey.computePublicKey();
        const shortId = publicKey.computeShortId();

        if (this.map.has(shortId.serialize())) {
            throw new Error(`Key with hash ${shortId.serialize()} already exists`);
        }

        this.map.set(shortId.serialize(), privateKey);

        if (!temp && privateKey.exportable()) {
            const exportedKey = privateKey.export();
            await this.db.writeKey(shortId, exportedKey);
        }
    }

    /**
     * Checks if a key exists in the keyring.
     */
    public async checkKey(keyHash: PublicKeyHash): Promise<boolean> {
        try {
            return !!(await this.loadKey(keyHash));
        } catch (e) {
            return false;
        }
    }

    /**
     * Adds a key to the keyring using a short key hash. If the key is not found in the keyring, it will be loaded from the database.
     */
    public async addKeyShort(keyHash: PublicKeyHash): Promise<PublicKey> {
        const privateKey = await this.loadKey(keyHash);
        return privateKey.computePublicKey();
    }

    /**
     * Deletes a key from the keyring.
     */
    public async delKey(keyHash: PublicKeyHash): Promise<void> {
        if (this.map.has(keyHash.serialize())) {
            this.map.delete(keyHash.serialize());
        }

        await this.db.delKey(keyHash);
    }

    /**
     * Returns a public key from the keyring.
     */
    public async getPublicKey(keyHash: PublicKeyHash): Promise<PublicKey> {
        const privateKey = await this.loadKey(keyHash);
        return privateKey.computePublicKey();
    }

    /**
     * Encrypts a message using a key from the keyring.
     */
    public async signMessage(keyHash: PublicKeyHash, data: Buffer): Promise<Buffer> {
        const privateKey = await this.loadKey(keyHash);
        const decryptor = privateKey.createDecryptor(privateKey.computePublicKey());
        return decryptor.sign(data);
    }

    /**
     * Signs a message using a key from the keyring and returns the signature and the public key.
     */
    public async signAddGetPublicKey(keyHash: PublicKeyHash, data: Buffer): Promise<[Buffer, PublicKey]> {
        const privateKey = await this.loadKey(keyHash);
        const decryptor = privateKey.createDecryptor(privateKey.computePublicKey());
        const signature = decryptor.sign(data);
        const publicKey = privateKey.computePublicKey();
        return [signature, publicKey];
    }

    /**
     * Encrypts a message using a key from the keyring.
     */
    public async signMessages(keyHash: PublicKeyHash, data: Buffer[]): Promise<Buffer[]> {
        const privateKey = await this.loadKey(keyHash);
        const decryptor = privateKey.createDecryptor(privateKey.computePublicKey());
        return decryptor.signBatch(data);
    }

    /**
     * Encrypts a message using a key from the keyring.
     */
    async encryptMessage(keyHash: PublicKeyHash, data: Buffer): Promise<{ publicKey: Buffer, digest: Buffer, encrypted: Buffer }> {
        const privateKey = await this.loadKey(keyHash);
        const encryptor = privateKey.computePublicKey().createEncryptor(privateKey);
        return encryptor.encrypt(data);
    }

    /**
     * Encrypts a message using a key from the keyring.
     */
    public async decryptMessage(keyHash: PublicKeyHash, publicKey: Buffer, digest: Buffer, encrypted: Buffer): Promise<Buffer> {
        const privateKey = await this.loadKey(keyHash);
        const decryptor = privateKey.createDecryptor(new PublicKey({ kind: 'pub.ed25519', key: publicKey }));
        return decryptor.decrypt(publicKey, digest, encrypted);
    }

    /**
     * Returns a private key from the keyring.
     */
    public async getPrivateKey(keyHash: PublicKeyHash): Promise<PrivateKey> {
        return await this.loadKey(keyHash);
    }

    /**
     * Returns all keys from the keyring.
     */
    public getKeys(): PublicKeyHash[] {
        return Array.from(this.map.values()).map((key) => key.computePublicKey().computeShortId());
    }
}
