******************************************** 
# COMPONENT LITERAL

**Description**

A flexible, and dead simple way to create reactive DOM components with template literals.

Components can be ultra simple or slightly more complex depending on the scenario. The slightly more complex style employs a reactive update method, and focuses on updating the data rather than the entire compenent itself. Updating the component's data will automatically trigger a re-render of the HTML, and will efficiently update the DOM using [morphdom](https://github.com/patrick-steele-idem/morphdom). All methods can be method chained together for ease of organization. Render and event methods will always update in the correct order, no matter how the code is organized on the page.

********************************************

## Usage

    import Component from 'component-literal';

********************************************

## Component `<HTML/>`

### Arguments

The HTML string used to create the component. Must be valid HTML. Using tagged template literal syntax, dynamic values can be used via '${value}'. Values can be either strings, elements or a Component Literal. An element will be coverted to a string and injected as innerHTML. The HTML will be condensed and turned into an actual DOM element.

********************************************

**EXAMPLE**

    Component `<div class="collection-title">THE TITLE</div>`;

********************************************

## build(config)

### Arguments

config (object) :
The config object is an object literal comprising of data, and a render method. Also uses the shorthand sytax for creating Component Literal components. There must be a data object nested in the config as well an "html()" method. Updating the data will automatically re-render the html and bind any event handlers.

********************************************

## render(target)

### Arguments

target (string or DOM element) :
Uses querySelectorAll. Will search for the target element and render if it exists in the DOM. Can be method chained from the Component.build() method.

********************************************

## events(methods)

### Arguments

methods (object) :
Comprised of a event listener and a target, the syntax is as follows:

**EXAMPLE**
  
    Component.events({
      'click .item' (e) {
        console.log(e);
      }
    });

********************************************
## update(props)

props (object) :
When updating a component, use the same property key to update the data object nested in the build method.

********************************************

**EXAMPLE**

    import Component from 'component-literal';
    
    Component.build({
      data:{
        items: [
          {name: "red"}, 
          {name: "beach house"}, 
          {name: "novice"}
        ]
      },
      html() {
        return (
          Component `
            <div class="collection-list">
              ${this.data.items.map((item, i) => {
                return (
                  Component `<div data-id="item_${i + 1}" class="item">
                    ${item.name}
                  </div>`
                )
              })}
            </div>`
        )
      }
    }).events({
        'click .item' (e) {
            e.currentTarget.innerHTML = "Clicked";
        }
    }).render("#page");

    Component.update({items: ["blue", "mountain cabin", "expert"]});

********************************************
morphdom

This module was created to solve the problem of updating the DOM in response to a UI component or page being rerendered. One way to update the DOM is to simply toss away the existing DOM tree and replace it with a new DOM tree (e.g., myContainer.innerHTML = newHTML). While replacing an existing DOM tree with an entirely new DOM tree will actually be very fast, it comes with a cost. The cost is that all of the internal state associated with the existing DOM nodes (scroll positions, input caret positions, CSS transition states, etc.) will be lost. Instead of replacing the existing DOM tree with a new DOM tree we want to transform the existing DOM tree to match the new DOM tree while minimizing the number of changes to the existing DOM tree. This is exactly what the morphdom module does! Give it an existing DOM node tree and a target DOM node tree and it will efficiently transform the existing DOM node tree to exactly match the target DOM node tree with the minimum amount of changes.

[Learn more about morphdom](https://github.com/patrick-steele-idem/morphdom)