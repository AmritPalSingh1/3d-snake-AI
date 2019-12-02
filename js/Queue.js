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
    return this.items[this.items.length - 1].slice();
  }

  second_last_item() {
    if (this.items.length <= 1) {
      return "No second last item";
    }
    return this.items[this.items.length - 2].slice();
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

  clear() {
    this.items = [];
  }

  arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length != b.length) return false;

    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

  hasDuplicates() {
    let result = false;
    for (let i = 0; i < this.items.length - 1; i++) {
      for (let j = i + 1; j < this.items.length; j++) {
        if (this.arraysEqual(this.items[i], this.items[j])) {
          result = true;
        }
      }
    }
    return result;
  }
}
