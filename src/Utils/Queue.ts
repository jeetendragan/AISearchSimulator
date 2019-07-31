export interface IQueue<T> {
    enqueue(item: T): void;
    dequeue(): T;
    peek(): T;
    clear(): void;
    isEmpty(): boolean;
}

export class Queue<T> implements IQueue<T> {
    queue: T[];

    constructor(queue?: T[]) {
        this.queue = queue || [];
    }

    public enqueue(item: T) {
        this.queue.push(item);
    }

    public dequeue(): T {
        return this.queue.shift();
    }

    public peek(): T {
        return this.queue[0];
    }

    public clear() {
        this.queue = [];
    }

    public count(): number {
        return this.queue.length;
    }

    isEmpty(): boolean {
        return(this.count() === 0);
    }
}
