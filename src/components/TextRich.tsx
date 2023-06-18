import { GlobalContext } from '@Omniapp/context/GlobalContext';
import {
  LINE_CLASS,
  LINE_SELECTED_CLASS,
  TEXT_RICH_CONTAINER_ID,
  TEXT_RICH_ID,
} from '@Omniapp/resources/constants';
import { copyListener, pasteListener } from '@Omniapp/utils/listeners';
import { memo, useContext, useEffect, useRef } from 'react';

function TextRich() {
  const { strings } = useContext(GlobalContext);

  const ref = useRef<HTMLDivElement>(null);

  const id = 'line_1';
  let lastKey: string | null = null;

  const getNextLineID = () =>
    id.replace('1', document.querySelectorAll('.'.concat(LINE_CLASS)).length.toString());

  const setLineOnClick = () => {
    const lines = Array.from<HTMLElement>(document.querySelectorAll('.'.concat(LINE_CLASS)));
    const onClick = (e: Event) => {
      lines
        .filter((l) => (e.currentTarget as Element).id !== l.id)
        .forEach((l) => l.classList.remove(LINE_SELECTED_CLASS));
      (e.currentTarget as Element).classList.add(LINE_SELECTED_CLASS);
    };
    lines.forEach((l) => (l.onclick = onClick));
  };

  useEffect(() => {
    const caretListener = () => {
      const selection = window.getSelection();
      if (!selection || !selection.anchorNode) return;
      const lines = Array.from(document.querySelectorAll('.'.concat(LINE_CLASS)));
      if (lastKey === 'enter' && lines.length > 0) lines.at(-1)!.id = getNextLineID();
      const caretElement = (
        selection.anchorNode.nodeName.toLowerCase() === '#text'
          ? selection.anchorNode.parentNode
          : selection.anchorNode
      ) as HTMLElement;
      if (!caretElement.id) caretElement.id = getNextLineID();
      lines.forEach((l) => {
        if (l.id === (caretElement as HTMLElement).id) return l.classList.add(LINE_SELECTED_CLASS);
        l.classList.remove(LINE_SELECTED_CLASS);
      });
    };
    document.addEventListener('selectionchange', caretListener);
    document.addEventListener('paste', pasteListener);
    document.addEventListener('copy', copyListener);
    return () => {
      document.removeEventListener('selectionchange', caretListener);
      document.removeEventListener('paste', pasteListener);
      document.removeEventListener('copy', copyListener);
    };
  }, []);

  return (
    <div
      id={TEXT_RICH_CONTAINER_ID}
      style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
      onClick={(e) => {
        if (e.target && e.target instanceof HTMLElement && e.target.id === e.currentTarget.id)
          document
            .querySelectorAll('.'.concat(LINE_CLASS))
            .forEach((l) => l.classList.remove(LINE_SELECTED_CLASS));
      }}
    >
      <div
        onKeyDown={(event) => {
          lastKey = event.key.toLowerCase();
          if (!ref.current) return;
          if (event.key.toLowerCase() === 'backspace') {
            const { current: ctn } = ref;
            const line = ctn.querySelector('.line');
            if (!line || ctn.innerHTML === '<br>') {
              event.preventDefault();
              ctn.innerHTML = `<div class="line ${LINE_SELECTED_CLASS}"><br></div>`;
            }
          }
        }}
        onKeyUp={setLineOnClick}
        onInput={() => {
          if (!ref.current) return;
          const { current: ctn } = ref;
          const line = ctn.querySelector('.line');
          if (!line) {
            ctn.innerHTML = `<div class="line ${LINE_SELECTED_CLASS}"><br></div>`;
            (ctn.querySelector('div.line') as HTMLDivElement).click();
          }
        }}
        ref={ref}
        contentEditable
        id={TEXT_RICH_ID}
        suppressContentEditableWarning
      >
        <div className={LINE_CLASS} id={id} autoFocus>
          {strings.textRichPlaceholder}
        </div>
      </div>
    </div>
  );
}

export default memo(TextRich);
