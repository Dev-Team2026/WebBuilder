import { useEditor, EditorContent, useEditorState } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import TextAlign from "@tiptap/extension-text-align"
import { TextStyle } from "@tiptap/extension-text-style";
import FontFamily from "@tiptap/extension-font-family";
import { BulletList, ListItem } from '@tiptap/extension-list'

export default function RichTextField({ value, onChange }) {

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            BulletList,
            ListItem,
            TextStyle,
            FontFamily,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
        ],

        content: value,

        onUpdate({ editor }) {
            onChange(editor.getHTML());
        },
    });

    const { isLeft, isCenter, isRight, isJustify, isHeading1, isHeading2 } = useEditorState({
        editor,
        selector: ctx => {
            if (!ctx.editor) {
                return {
                    isLeft: false,
                    isCenter: false,
                    isRight: false,
                    isJustify: false,
                    isHeading1: false,
                    isHeading2: false,
                }
            }

            return {
                isLeft: ctx.editor.isActive({ textAlign: 'left' }) ?? false,
                isCenter: ctx.editor.isActive({ textAlign: 'center' }) ?? false,
                isRight: ctx.editor.isActive({ textAlign: 'right' }) ?? false,
                isJustify: ctx.editor.isActive({ textAlign: 'justify' }) ?? false,
                isHeading1: ctx.editor.isActive({ level: 1 }) ?? false,
                isHeading2: ctx.editor.isActive({ level: 2 }) ?? false,
            }
        },
    })

    const { isInter, isComicSans, isSerif, isMonospace, isCursive, isExo2, isCssVariable } =
        useEditorState({
            editor,
            selector: ctx => {
                return {
                    isInter: ctx.editor.isActive('textStyle', { fontFamily: 'Inter' }),
                    isComicSans: ctx.editor.isActive('textStyle', {
                        fontFamily: '"Comic Sans MS", "Comic Sans"',
                    }),
                    isSerif: ctx.editor.isActive('textStyle', { fontFamily: 'serif' }),
                    isMonospace: ctx.editor.isActive('textStyle', { fontFamily: 'monospace' }),
                    isCursive: ctx.editor.isActive('textStyle', { fontFamily: 'cursive' }),
                    isExo2: ctx.editor.isActive('textStyle', { fontFamily: '"Exo 2"' }),
                    isCssVariable: ctx.editor.isActive('textStyle', {
                        fontFamily: 'var(--title-font-family)',
                    }),
                }
            },
        })

    if (!editor) return null;


    return (
        <div>
            <div className="toolbar">
                <button
                    onClick={() => editor.chain().focus().toggleHeading({level: 1 }).run()}
                    className={isHeading1 ? 'is-active' : ''}
                >
                    Heading
                </button>
                <button
                    onClick={() => editor.chain().focus().setTextAlign('left').run()}
                    className={isLeft ? 'is-active' : ''}
                >
                    Left
                </button>
                <button
                    onClick={() => editor.chain().focus().setTextAlign('center').run()}
                    className={isCenter ? 'is-active' : ''}
                >
                    Center
                </button>
                <button
                    onClick={() => editor.chain().focus().setTextAlign('right').run()}
                    className={isRight ? 'is-active' : ''}
                >
                    Right
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()} className="funcBtn"
                >
                    <b>B</b>
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()} className="funcBtn"
                >
                    <i>I</i>
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleUnderline().run()} className="funcBtn"
                >
                    <u>U</u>
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={editor.isActive('bulletList') ? 'is-active' : ''}
                >
                    Toggle bullet list
                </button>
                <button
                    onClick={() => editor.chain().focus().sinkListItem('listItem').run()}
                    disabled={!editor.can().sinkListItem('listItem')}
                >
                    Sink list item
                </button>
                <button
                    onClick={() => editor.chain().focus().liftListItem('listItem').run()}
                    disabled={!editor.can().liftListItem('listItem')}
                >
                    Lift list item
                </button>
                <button
                    onClick={() => editor.chain().focus().setFontFamily('Inter').run()}
                    className={isInter ? 'is-active' : ''}
                    data-test-id="inter"
                >
                    Inter
                </button>
                <button
                    onClick={() =>
                        editor.chain().focus().setFontFamily('"Comic Sans MS", "Comic Sans"').run()
                    }
                    className={isComicSans ? 'is-active' : ''}
                    data-test-id="comic-sans"
                >
                    Comic Sans
                </button>
                <button
                    onClick={() => editor.chain().focus().setFontFamily('serif').run()}
                    className={isSerif ? 'is-active' : ''}
                    data-test-id="serif"
                >
                    Serif
                </button>
                <button
                    onClick={() => editor.chain().focus().setFontFamily('monospace').run()}
                    className={isMonospace ? 'is-active' : ''}
                    data-test-id="monospace"
                >
                    Monospace
                </button>
                <button
                    onClick={() => editor.chain().focus().setFontFamily('cursive').run()}
                    className={isCursive ? 'is-active' : ''}
                    data-test-id="cursive"
                >
                    Cursive
                </button>
                <button
                    onClick={() => editor.chain().focus().setFontFamily('var(--title-font-family)').run()}
                    className={isCssVariable ? 'is-active' : ''}
                    data-test-id="css-variable"
                >
                    CSS variable
                </button>
                <button
                    onClick={() => editor.chain().focus().setFontFamily('"Exo 2"').run()}
                    className={isExo2 ? 'is-active' : ''}
                    data-test-id="exo2"
                >
                    Exo 2
                </button>
                <button
                    onClick={() => editor.chain().focus().unsetFontFamily().run()}
                    data-test-id="unsetFontFamily"
                >
                    Unset font family
                </button>
            </div>

            <EditorContent editor={editor} />
        </div>
    );
}