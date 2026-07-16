import RichTextField from "../../components/fields/RichTextField.jsx";

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