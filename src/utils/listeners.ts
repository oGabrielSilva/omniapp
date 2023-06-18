export const copyListener = (e: ClipboardEvent) => {
  e.preventDefault();
  const selection = window.getSelection();
  if (!selection || !e.clipboardData) return;
  const selectedText = selection.toString();
  const tempElement = document.createElement('div');
  tempElement.textContent = selectedText;
  e.clipboardData.clearData();
  e.clipboardData.setData('text/plain', tempElement.textContent);
  const originalRange = selection.getRangeAt(0);
  const originalEndContainer = originalRange.endContainer;
  const originalEndOffset = originalRange.endOffset;
  selection.removeAllRanges();
  const newRange = document.createRange();
  newRange.setStart(originalEndContainer, originalEndOffset);
  newRange.collapse(true);
  selection.addRange(newRange);
};

export const pasteListener = (e: ClipboardEvent) => {
  e.preventDefault();
  const selection = getSelection();
  const data = e.clipboardData?.getData('text');
  if (!selection || !data) return;
  const range = selection.getRangeAt(0);
  range.deleteContents();
  const textNode = document.createTextNode(data);
  range.insertNode(textNode);
  range.setStartAfter(textNode);
  range.setEndAfter(textNode);
  selection.removeAllRanges();
  selection.addRange(range);
};
