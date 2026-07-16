import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { BulletList, ListItem } from '@tiptap/extension-list'

export default function RichTextField({ value, onChange }) {

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            BulletList,
            ListItem
        ],

        content: value,

        onUpdate({ editor }) {
            onChange(editor.getHTML());
        },
    });


    if (!editor) return null;


    return (
        <div>
            <div className="toolbar">

                <button
                    onClick={() => editor.chain().focus().toggleBold().run()} className="funcBtn"
                >
                    Bold
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()} className="funcBtn"
                >
                    Italic
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleUnderline().run()} className="funcBtn"
                >
                    Underline
                </button>
                <div className="button-group">
                    <button
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        className={editor.isActive('bulletList') ? 'is-active' : ''}
                    >
                        Toggle bullet list
                    </button>
                    <button
                        onClick={() => editor.chain().focus().splitListItem('listItem').run()}
                        disabled={!editor.can().splitListItem('listItem')}
                    >
                        Split list item
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
                </div>
            </div>

            <EditorContent editor={editor} />
        </div>
    );
}