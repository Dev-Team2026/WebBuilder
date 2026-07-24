import RichTextField from "../../components/fields/RichTextField.jsx";

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