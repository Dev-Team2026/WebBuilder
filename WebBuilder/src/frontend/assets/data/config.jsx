import RichTextField from "../../components/fields/RichTextField.jsx";

const setTableSlots = (amount) => {
    let slots = ""
    for (let i = 0; i < amount; i++){
        slots = slots + "auto ";
    }
    //console.log(slots)
    return slots
}

const setTableProps = (content, columns, rows) => {
    let amount = columns*rows
    let currentRow = 1, currentColumn = 1;
    let reformatedContent = []
    
    if (content.length <= amount){
      for (let i = 0; i < amount; i++){
        let slotFilled = false
        content.forEach(element => {
            if (element.props.column == currentColumn && element.props.row == currentRow){
                slotFilled = true;
            }
        });
        if (!slotFilled){
            content.push({
              type: "TableCard",
              props: {
                column: currentColumn,
                row: currentRow
              },
              readOnly: { column: true, row: true }
            })
        }
        
        //
        currentColumn++;
        if(currentColumn > columns){
            currentColumn = 1;
            currentRow++;
        }
      }
      content.forEach(element => {
          reformatedContent[columns*(element.props.row-1)+element.props.column-1] = element
      });
    } else {
      reformatedContent = [...content]
      let totalDeleted = 0
      content.forEach((element, index) => {
        //console.log(element.props.column, element.props.row)
        if(element.props.column > columns || element.props.row > rows){
            //console.log("passed", index)
            reformatedContent.splice(index-totalDeleted, 1)
            //console.log(reformatedContent)
            totalDeleted++
        }
      });
      
    }
    
    return reformatedContent
}

export const config = {
    components: {
        Heading: {
            fields: {
                text: {
                    type: "custom",
                    render: ({ value, onChange }) => (
                        <RichTextField
                            value={value}
                            onChange={onChange}
                        />
                    )
                },
                background: {
                    type: "text",
                }
            },
            render: ({ text, background }) => <div style={{background: `${background}`}}
                dangerouslySetInnerHTML={{
                    __html: text,
                }}
            />,
        },

        Subheading: {
            fields: {
                text: {
                    type: "text",
                },
                background: {
                    type: "text",
                }
            },
            render: ({text, background}) => <h3 style={{background: `${background}`}} className="">{text}</h3>
        },

        Image: {
            fields: {
                url: { type: "text" },
            },
            render: ({url}) => <img className="" src={url}/>
        },

        Table: {
          fields: {
              rows: {type: "number"},
              columns: {type: "number"},
          }
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
                        props: {columns: 1, rows: 1, content: setTableProps([],1,1)}
                    }
                }
                return {
                    props: {
                      ...props,
                      content: setTableProps(props.content, props.columns,props.rows),
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
                column: {
                    type: "number",
                    min: 1
                },
                row: {
                    type: "number",
                    min: 1
                },
            },
            permissions: {
              delete: false,
              insert: false,
              drag: false,
              insert: false
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
        Link : {
            fields: {
                text: {
                    type: "text"
                },
                link: {
                    type: "text"
                },
            },
            render: ({text, link}) => <a href={link}>{text}</a>
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