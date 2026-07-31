# Adding Components to Puck Editor

## In the config.jsx file

The file will be loosely formatted in the same manner as the below example, 

```jsx
export const config = {
    components: {
        NAME: { /* This is the name of your field on the editor */
            fields: { /* These are your inputs in which the user will fill out */
                INPUT1: { /* These are the labels for the input boxes the user will fill out */
                    type: "text", /* This is the input type, (text, number, custom)  */
                },
                INPUT2: {
                    type: "text",
                }
            },
            render: ({INPUT1, INPUT2}) => <h3 style={{background: `${INPUT2}`}} className="">{INPUT1}</h3>
            /* The render field will take in the inputs you created, and pass them onto your HTML element */
        },
    },
    ...
}
```

Each component is made up of a name, input fields, and a render.

The name is the title of the component that shows up on the left side of the editor.

The input fields are for the data you wish to pass to the HTML element when rendered. 
These fields can be named however you'd like but be aware it will show up in the editor so make it something that is relevant to what the field is.

The render takes the data passed through to it to render your HTML element, the Element can be any element that you'd like, and you can pass through the data to the element however necessary.

To add a component to the config.jsx file, just add a new JSON formatted item to the list below (or in whatever order).