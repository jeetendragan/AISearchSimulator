export class Queue<T> {
    queue: T[];

    constructor(queue?: T[]) {
        this.queue = queue || [];
    }

    enqueue(item: T) {
        this.queue.push(item);
    }

    dequeue(): T {
        return this.queue.shift();
    }

    clear() {
        this.queue = [];
    }

    get count(): number {
        return this.queue.length;
    }

    isEmpty(): boolean {
        return(this.count === 0);
    }
}
