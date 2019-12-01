class Queue {
  constructor() {
    this.items = [];
  }

  enqueue(element) {
    this.items.push(element);
  }

  dequeue() {
    if (this.isEmpty()) {
      return "Underflow";
    }
    return this.items.shift();
  }

  tail() {
    if (this.isEmpty()) {
      return "No element in Queue";
    }
    return this.items[0];
  }

  head() {
    if (this.isEmpty()) {
      return "No element in Queue";
    }
    return this.items[this.items.length - 1];
  }

  getList() {
    return this.items;
  }

  isEmpty() {
    // return true if the queue is empty.
    return this.items.length == 0;
  }

  printQueue() {
    var str = "";
    for (var i = 0; i < this.items.length; i++) str += this.items[i] + " ";
    return str;
  }
}
