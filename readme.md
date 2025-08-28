1) What is the difference between getElementById, getElementsByClassName, and querySelector/querySelectorAll?

getElementById(id): Returns the single element with that id or null. Fastest; id must be unique.

getElementsByClassName(className): Returns a live HTMLCollection of all elements with that class. Live = auto-updates when DOM changes; not array (needs Array.from to map/filter).

querySelector(cssSelector): Returns the first element that matches a CSS selector (e.g., "#id", ".class", "div.card > button").

querySelectorAll(cssSelector): Returns a static NodeList of all matches. Static = does not auto-update; supports forEach directly.


2) How do you create and insert a new element into the DOM?

Create: const el = document.createElement('div');
Configure: el.textContent = 'Hello'; el.classList.add('card');
Insert:Append as last child: parent.appendChild(el)
Insert before a node: parent.insertBefore(el, referenceNode)
Insert with modern API: parent.append(el) or parent.prepend(el)
Insert HTML quickly: parent.insertAdjacentHTML('beforeend', '<li>Item</li>')
const list = document.getElementById('todos');
const item = document.createElement('li');
item.textContent = 'Buy milk';
list.append(item);


3) What is Event Bubbling and how does it work?

When an event happens on a child element, it “bubbles” up through its ancestors: target → parent → grandparent → document → window.
Each ancestor has a chance to handle the same event.
Default phase is bubbling (3rd phase). The order is: capturing (down), target, bubbling (up).


4) What is Event Delegation in JavaScript and why is it useful?

Attach one event listener on a common ancestor instead of many listeners on each child. Inside the handler, check e.target or e.target.closest(selector) to decide which child triggered the event.

Benefits:Better performance and less memory (one listener instead of many)
Works for dynamically added elements (no need to reattach)
Cleaner, simpler code

5) What is the difference between preventDefault() and stopPropagation()?

preventDefault(): Prevents the browser’s default action for the event (e.g., link navigation, form submit, context menu).
stopPropagation(): Stops the event from traveling to ancestor elements (no bubbling to parents). It does not cancel the default browser action.
stopImmediatePropagation(): Like stopPropagation but also prevents any other listeners on the same element from running.
Often used together when you want to both block a default action and keep the event from reaching parent handlers.