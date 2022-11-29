import Prism from 'prismjs';
// 여기 css를 수정해서 코드 하이라이팅 커스텀 가능
import 'prismjs/themes/prism.css';

import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';

import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';

import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';

export default function Writer() {
  return (
    <div>
      <div>
        <textarea placeholder="CodeConvention을 입력해주세요"></textarea>
      </div>
      <div>
        <form>
          <label>
            19:00~20:00
            <input type="text" />
            <br />
            20:00~21:00
            <input type="text" />
          </label>
        </form>
      </div>
      <Editor
        previewStyle="vertical"
        plugins={[colorSyntax, [codeSyntaxHighlight, { highlighter: Prism }]]}
      />
    </div>
  );
}
