class Node {
    constructor(data, priority) {
        this.data = data;
        this.priority = priority;
        this.prev = null;
        this.next = null;
    }
}

export class PriorityQueue {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    enqueue(data, priority) {
        const newNode = new Node(data, priority);

        if (!this.head) {
            this.head = this.tail = newNode;
        } else {
            let current = this.head;
            while (current && current.priority <= priority) {
                current = current.next;
            }
            if (!current) {
                this.tail.next = newNode;
                newNode.prev = this.tail;
                this.tail = newNode;
            } else if (!current.prev) {
                newNode.next = current;
                current.prev = newNode;
                this.head = newNode;
            } else {
                const prevNode = current.prev;
                prevNode.next = newNode;
                newNode.prev = prevNode;
                newNode.next = current;
                current.prev = newNode;
            }
        }
    }

    dequeue() {
        if (!this.head) return null;
        const node = this.head;
        this.head = this.head.next;
        if (this.head) {
            this.head.prev = null;
        } else {
            this.tail = null;
        }

        return node.data; 
    }

    isEmpty() {
        return !this.head;
    }
}
