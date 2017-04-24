******************************************** 
# COMPONENT LITERAL

**Description**

A lightweight, flexible, and dead simple way to create DOM components with template literals.

Categorized with shorthand and longhand styles, the components can be ultra simple or slightly more complex depending on the scenario. The slightly more complex longhand style employs a reactive update method, and focuses on updating the data rather than the entire compenent itself. Updating the component's data will automatically trigger a re-render of the HTML, and will efficiently update the DOM using [morphdom](https://github.com/patrick-steele-idem/morphdom).

********************************************

Usage

    import Component from 'component-literal';
    

********************************************

Method (shorthand)

    Component `<div class="component">${value}</div>`;

**Arguments**

The HTML string used to create the component. Must be valid HTML. Using tagged template literal syntax, dynamic values can be used via '${value}'. Values can be either strings, elements or a Component Literal. An element will be coverted to a string and injected as innerHTML.

********************************************
Method (shorthand)

    Component.render(component, DOMSelector, callback);

**Arguments**

component (DOM Element Node) :
The declared component wished to render.

DOMSelector (String) :
The target element to render the component to. Can use string query syntax ('#id', '.class', *all', etc.), or an element stored in a variable (const target = $('#id'). 

********************************************
Method (shorthand)

    [ComponentVariableName].update( Component `<div class="new-component"></div>`);

Replaces entire component.

**EXAMPLE**

    const ui = Component `<div class="icon"><i class="fa fa-arrow-up"></i></div>`;
    const close = Component `<div class="icon"><i class="fa fa-close"></i></div>`;

    ui.update(close);

********************************************

**EXAMPLE**

    import Component from 'component-literal';
    import * as data from '../../../data.json';
  
    class List {
      constructor() {
        this.items = data.items.map((item, i) => {
            return (
                Component `
                  <div id="${item.id}" class="collection-item">
                    <div class="content">
                    <div class="media">
                      <div class="image" style="background-image:url(${item.assetUrl});"></div>
                    </div>
                      <div class="title">
                        ${item.title}
                      </div>
                      <div class="tags">
                        ${item.categories}
                      </div>
                    </div>
                  </div>
              `)
        });

        this.container = Component `<div class="collection-list">${this.items.slice(0, 4)}</div>`;
        
        Component.render(this.container, '#page');
      }
    }

    export default List;

********************************************

Method (longhand)

    Component.build(config);

**Arguments**

config (object) :
The config object is an object literal comprising of data, and a render method. Also uses the shorthand sytax for creating Component Literal components.

********************************************

Method (longhand)

    [ComponentVariableName].update(props);

**Arguments**

props (object) :
The props that will change with any update. Must match the property names from the first render.

********************************************

Method (longhand)

    [ComponentVariableName].render(target);

**Arguments**

target (string) :
Uses querySelectorAll. Will search for the target element and render if it exists in the DOM. Can be method chained from the Component.build() method.

********************************************

**EXAMPLE**

    import Component from 'component-literal';
    
    class List {
      constructor() {
        this.items = [{name: "red"}, {name: "beach"}, {name: "novice"}];
        this.container = Component.build({
          data : {
            items : this.items
          },
          render() {
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
    
        }).render(".item");
      }
      addItem(item) {
        this.items.push({name: item});
        this.update({items: this.items});
      }
      update(props) {
        this.container.update(props);
      }
    }
    
    export default List;

********************************************
morphdom

This module was created to solve the problem of updating the DOM in response to a UI component or page being rerendered. One way to update the DOM is to simply toss away the existing DOM tree and replace it with a new DOM tree (e.g., myContainer.innerHTML = newHTML). While replacing an existing DOM tree with an entirely new DOM tree will actually be very fast, it comes with a cost. The cost is that all of the internal state associated with the existing DOM nodes (scroll positions, input caret positions, CSS transition states, etc.) will be lost. Instead of replacing the existing DOM tree with a new DOM tree we want to transform the existing DOM tree to match the new DOM tree while minimizing the number of changes to the existing DOM tree. This is exactly what the morphdom module does! Give it an existing DOM node tree and a target DOM node tree and it will efficiently transform the existing DOM node tree to exactly match the target DOM node tree with the minimum amount of changes.

[Learn more about morphdom](https://github.com/patrick-steele-idem/morphdom)