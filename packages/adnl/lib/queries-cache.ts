import {createDataPromise, DataRx, DataTx, HashMap} from "./utils";
import {Serializable} from "./adnl-node-id";

export class QueryId implements Serializable {
  public readonly queryId: Buffer;

  constructor(queryId: Buffer) {
    this.queryId = queryId;
  }

  public serialize(): Buffer {
    return this.queryId;
  }
}

export class QueriesCache {
  public readonly queries: HashMap<QueryId, DataTx>;

  public get size(): number {
    return this.queries.size;
  }

  constructor() {
    this.queries = new HashMap();
  }

  public isEmpty(): boolean {
    return this.queries.size === 0;
  }

  public addQuery(queryId: QueryId): PendingAdnlQuery {
    const [tx, rx] = createDataPromise();

    this.queries.set(queryId, tx);

    return new PendingAdnlQuery(queryId, rx, this);
  }

  public updateQuery(queryId: QueryId, answer: Buffer): void {
    const tx = this.queries.get(queryId);
    if (tx) {
      tx(answer);
      this.queries.delete(queryId);
    }
  }
}

export class PendingAdnlQuery {
  public readonly queryId: QueryId;
  private readonly dataRx: DataRx;
  private readonly cache: QueriesCache;
  private finished: boolean;

  constructor(queryId: QueryId, dataRx: DataRx, cache: QueriesCache) {
    this.queryId = queryId;
    this.dataRx = dataRx;
    this.cache = cache;
    this.finished = false;
  }

  public async wait(timeout: number): Promise<Buffer | undefined> {
    return await new Promise<Buffer | undefined>((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        this.dispose();
        resolve(undefined);
      }, timeout);
      this.dataRx.then((data) => {
        clearTimeout(timeoutId);
        this.dispose();
        resolve(data);
      }).catch((err) => {
        clearTimeout(timeoutId);
        this.dispose();
        reject(err);
      });
    });
  }

  public dispose(): void {
    if (this.finished) {
      return;
    }

    this.cache.queries.delete(this.queryId);
  }
}
