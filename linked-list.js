/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
	constructor(vals = []) {
		this.head = null;
		this.tail = null;
		this.length = 0;

		for (let val of vals) this.push(val);
	}

	/** push(val): add new value to end of list. */

	push(val) {
		let newNode = new Node(val);

		if (this.head === null) this.head = newNode;

		if (this.tail !== null) this.tail.next = newNode;

		this.tail = newNode;

		this.length++;
	}


	/** unshift(val): add new value to start of list. */

	unshift(val) {
		let newNode = new Node(val);

		if (this.head) newNode.next = this.head;
		
		this.head = newNode;

		if (!this.tail) this.tail = newNode;

		this.length++;
	}

	/** pop(): return & remove last item. */

	pop() {
		if (this.length === 0) throw Error("No items to remove");

		let lastVal = this.tail;

		let current = this.head;

		if (this.head === this.tail) {
			this.head = null;
			this.tail = null;
			this.length = 0;
			return lastVal.val;
		}

		while (current.next.next) current = current.next;
		
		this.tail = current;

		this.length--;

		return lastVal.val;
	}

	/** shift(): return & remove first item. */

	shift() {
		if (this.length === 1) {
			this.tail = null;
		}

		let currentHead = this.head;

		this.head = this.head.next;

		this.length--;

		return currentHead.val;
	}

	/** getAt(idx): get val at idx. */

	getAt(idx) {
		if (idx < 0 || idx >= this.length) throw Error("Invalid Index");
		
		let current = this.head;
		for (let i = 0; i<this.length; i++) {
			if (i === idx) {
				return current.val;
			}
			current = current.next;
		}
	}

	/** setAt(idx, val): set val at idx to val */

	setAt(idx, val) {
		if (idx < 0 || idx > this.length) throw Error("Invalid Index");

		// Add to end
		if (idx === this.length) {
			this.push(val);
			return; 
		}

		let newNode = new Node(val);

		// Add to beginning
		if (idx === 0) {
			newNode.next = this.head.next;
			this.head = newNode;	
		}


		let current = this.head.next;
		let previous = this.head;
		for (let i = 1; i<this.length; i++) {
			if (i === idx) {
				previous.next = newNode;
				newNode.next = current.next;
				return;
			}
			previous = current;
			current = current.next;
		}
	}

	/** insertAt(idx, val): add node w/val before idx. */

	insertAt(idx, val) {
		if (idx < 0 || idx > this.length) throw Error("Invalid Index");

		// Add to end
		if (idx === this.length) {
			this.push(val);
			return undefined; 
		}

		// Add to beginning
		if (idx === 0) {
			this.unshift(val);
			return undefined;
		}

		let newNode = new Node(val);

		let current = this.head.next;
		let previous = this.head;
		for (let i = 1; i<this.length; i++) {
			if (i === idx) {
				previous.next = newNode;
				newNode.next = current;
				this.length++
				return undefined;
			}
			previous = current;
			current = current.next;
		}
	}

	/** removeAt(idx): return & remove item at idx, */

	removeAt(idx) {
		if (idx < 0 || idx >= this.length) throw Error("Invalid Index");

		// Remove from end
		if (idx === this.length) {
			this.pop();
			return; 
		}

		// Remove from beginning
		if (idx === 0) {
			this.shift();
			return;
		}

		let current = this.head.next;
		let previous = this.head;
		for (let i = 1; i<this.length; i++) {
			if (i === idx) {
				previous.next = current.next;
				this.length--;
				return current.val;
			}
			previous = current;
			current = current.next;
		}
	}

	/** average(): return an average of all values in the list */

	average() {
		if (this.length === 0) return 0;
				
		let current = this.head;

		let sum = current.val;

		while (current.next) {
			current = current.next;
			sum += current.val;
		}

		return sum/this.length;
	}
}

module.exports = LinkedList;
