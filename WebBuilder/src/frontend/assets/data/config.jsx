import RichTextField from "../../components/fields/RichTextField.jsx";

const setTableSlots = (amount) => {
    let slots = ""
    for (let i = 0; i < amount; i++){
        slots = slots + "auto ";
    }
    //console.log(slots)
    return slots
}

const setTableProps = (amount) => {
    let slots = []
    console.log(amount)
    for (let i = 0; i < amount; i++){
        slots.push({
          type: "TableCard",
          props: {},
        })
    }
    return slots
}

export const config = {
    components: {
        Heading: {
            fields: {
                text: {
                    type: "text",
                },
            },
            render: ({ text }) => <h1 className="">{text}</h1>,
        },

        Subheading: {
            fields: {
                text: {
                    type: "text",
                },
            },
            render: ({text}) => <h3 className="">{text}</h3>
        },

        Image: {
            fields: {
                url: { type: "text" },
            },
            render: ({url}) => <img className="" src={url}/>
        },

        Text: {
            fields: {
                text: {
                    type: "textarea",
                },
            },
            render: ({ text }) => <p className="">{text}</p>,
        },

        RichText: {
            fields: {
                text: {
                    type: "custom",
                    render: ({ value, onChange }) => (
                        <RichTextField
                            value={value}
                            onChange={onChange}
                        />
                    ),
                },
            },

            defaultProps: {
                text: "<p>Edit your text...</p>",
            },

            render: ({ text }) => (
                <div
                    dangerouslySetInnerHTML={{
                        __html: text,
                    }}
                />
            ),
        },

        Table: {
            fields: {
                content: {
                    type: "slot",
                    allow: [],
                },
                columns: {
                    type: "number",
                    min: 1
                },
                rows: {
                    type: "number",
                    min: 1
                },
            },
            resolveData: async ({props}) => {
                if (props.columns === undefined || props.rows === undefined) {
                    return {
                        props: {columns: 1, rows: 1, content: setTableProps(1)}
                    }
                }
                return {
                    props: {
                      ...props,
                      content: setTableProps(props.columns*props.rows),
                    },
                };
            },
            render: ({ content: Content, columns, rows }) => (
                <Content
                  style={{
                    // Use CSS grid in this slot
                    border: "2px solid black",
                    padding: 16,
                    display: "grid",
                    gridTemplateColumns: setTableSlots(columns),
                    gridTemplateRows: setTableSlots(rows),
                    gap: 16,
                  }}
                />
            ),
        },
        TableCard: {
            fields: {
                content: {
                    type: "slot",
                },
            },
            defaultProps: {
              content: [
                {
                  type: "Text",
                  props: {
                    text: "Pre-populated",
                  },
                },
              ],
            },
            inline: true,
            render: ({ content: Content, puck }) => (
                <Content
                  ref={puck.dragRef}
                  style={{
                    // Use CSS grid in this slot
                    border: "2px solid black",
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    gridTemplateRows: "1fr",
                  }}
                />
            ),
        },

        Button: {
            fields: {
                text: {
                    type: "text",
                },
                href: {
                    type: "text",
                },
            },
            render: ({ text, href }) => (
                <a href={href}>
                    <button className="">{text}</button>
                </a>
            ),
        },
    },
};
/*
Table: {
            fields: {
                text: {
                    type: "custom",
                    render: ({ value, onChange }) => (
                        <TableField
                            value={value}
                            onChange={onChange}
                        />
                    ),
                },
            },

            defaultProps: {
                text: "<table> <tr><th>head</th><th>head</th></tr> <tr><td>body</td><td>body</td></tr> </table>",
            },

            render: ({ text }) => (
                <div
                    dangerouslySetInnerHTML={{
                        __html: text,
                    }}
                />
            ),
        },
*/