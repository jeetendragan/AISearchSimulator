import { IQueue } from './Queue';
import BinaryHeapStrategy from './BinaryHeapStrategy';

export type Comparator<T> = (a: T, b: T) => number;

export interface Options<T> {
    comparator: Comparator<T>;
    initialValues?: T[];
}

export interface QueueStrategy<T> {
    enqueue(value: T): void;
    dequeue(): T;
    peek(): T;
    clear(): void;
}

export class PriorityQueue<T> implements IQueue<T> {
    private len = 0;
    public get length() { return this.len; }

    private strategy: QueueStrategy<T>;

    public constructor(options: Options<T>) {
        this.len = options.initialValues ? options.initialValues.length : 0;
        this.strategy = new BinaryHeapStrategy(options);
    }

    public enqueue(value: T) {
        this.len++;
        this.strategy.enqueue(value);
    }

    public dequeue() {
        if (!this.len) { throw new Error('Empty queue'); }
        this.len--;
        return this.strategy.dequeue();
    }

    public peek() {
        if (!this.len) { throw new Error('Empty queue'); }
        return this.strategy.peek();
    }

    public clear() {
        this.len = 0;
        this.strategy.clear();
    }

    public isEmpty(): boolean {
        return this.len === 0;
    }
}
