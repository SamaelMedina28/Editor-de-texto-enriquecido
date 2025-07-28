import './index.css'
import { useEditor, EditorContent, useEditorState } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Toolbar } from './Toolbar'
import { useState } from 'react'

const Tiptap = () => {
  const [titulo, setTitulo] = useState('');
  const editor = useEditor({
    extensions: [StarterKit.configure({
      link: {
        HTMLAttributes: {
          target: '_blank',
        },
        autolink: true,
      },
    })],
    content: '<p>Hello World!</p>',
  });
  const editorState = useEditorState({
    editor,
    selector: (info) => {
      return {
        isBold: info.editor.isActive('bold'),
        isItalic: info.editor.isActive('italic'),
        isUnderline: info.editor.isActive('underline'),
        isCode: info.editor.isActive('code'),
        isHeading1: info.editor.isActive('heading', { level: 1 }),
        isHeading2: info.editor.isActive('heading', { level: 2 }),
        isHeading3: info.editor.isActive('heading', { level: 3 }),
        isParagraph: info.editor.isActive('paragraph'),
        isOrdenList: info.editor.isActive('orderedList'),
        isBulletList: info.editor.isActive('bulletList'),
        isLink: info.editor.isActive('link'),
      }
    }
  })
  const comandos = {
    toggleBold: () => editor.chain().focus().toggleBold().run(),
    toggleItalic: () => editor.chain().focus().toggleItalic().run(),
    toggleUnderline: () => editor.chain().focus().toggleUnderline().run(),
    toggleCode: () => editor.chain().focus().toggleCode().run(),
    toggleHeading1: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    toggleHeading2: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    toggleHeading3: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    toggleParagraph: () => editor.chain().focus().setParagraph().run(),
    toggleOrdenList: () => editor.chain().focus().toggleOrderedList().run(),
    toggleBulletList: () => editor.chain().focus().toggleBulletList().run(),
    agregarLink: () => {
      if (editorState.isLink) {
        editor.chain().focus().unsetLink().run();
      } else {
        const url = window.prompt('Introduce la URL del enlace');
        if (url && url.trim().length > 0) {
          editor.chain().focus().setLink({ href: url }).run();
        }
      }
    },

  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(titulo, editor.getHTML());
  }

  return (
    <>
    <form className="form-text w-1/2 mx-auto" onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <input type="text" placeholder="Titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
        <Toolbar comandos={comandos} editorState={editorState} />
        <EditorContent editor={editor} />
      </div>
      <div className="flex justify-end my-2">
      <button className="bg-blue-500 text-white p-2 px-4 rounded hover:bg-blue-600" type="submit">Guardar</button>
      </div>
    </form>
    </>
  )
}

export default Tiptap