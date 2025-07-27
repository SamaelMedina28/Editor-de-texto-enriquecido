import './index.css'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {Toolbar} from './Toolbar'

const Tiptap = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Hello World!</p>',
  })

  return (
    <>
    <Toolbar />
      <EditorContent editor={editor} />
    </>
  )
}

export default Tiptap